<template>
  <div id="nav_wrap">
    <h1 class="logo"><img src="../../../assets/logo.png"></h1>
    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      text-color="#fff"
      active-text-color="#fff"
      router
    >
      <template v-for="(item, index) in routes">
        <el-submenu v-if="!item.hidden" :key="item.id" :index="index+''">
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"></svg-icon>
            <span slot="title">{{ item.meta.name }}</span>
          </template>
          <template v-for="childitem in item.children">
            <el-menu-item :key="childitem.id" :index="childitem.path">{{ childitem.meta.name }}</el-menu-item>
          </template>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>
<script>
import { ref, reactive, computed } from "@vue/composition-api";
export default {
  name: "navMenu",
  setup(props, { refs, root }) {
    // 菜单路由项
    const routes = reactive(root.$router.options.routes);
    // 监听导航栏状态变化 变化事件源来自header
    const isCollapse = computed(() => root.$store.state.app.isCollapse)
    return {
      routes,
      isCollapse
    };
  }
};
</script>
<style lang="scss" scoped>
#nav_wrap {
  width: 250px;
  height: 100vh;
  background-color: #344a5f;
  position: fixed;
  left: 0;
  top: 0;
  svg {
  font-size: 20px;
  margin-right: 10px;
}
}
/**解决多出一个像素 */
.el-menu {
  border-right-width: 0;
}

.logo{
  text-align: center;
  img{
    width: 92px;
    margin: 28px auto 24px;
  }
}
.open{
  #nav_wrap{
    width: 250px;
  }
}
.close{
  #nav_wrap{
    width: 64px;
    .logo img{
      width: 70%;
    }
  }
}

</style>