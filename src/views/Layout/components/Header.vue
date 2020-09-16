<template>
  <div id="header_wrap">
    <div class="pull-left header-icon" @click="navMenuState">
      <svg-icon className="menu" class="menu"></svg-icon>
    </div>
    <div class="pull-right right-container">
        <div class="user-info pull-left">
            <img src="../../../assets/me.jpg">{{ username }}
        </div>
      <div class="header-icon pull-left"  @click="exit">
        <svg-icon className="exit" class="exit"></svg-icon>
      </div>
    </div>
  </div>
</template>
<script>
import { computed } from '@vue/composition-api';
export default {
  name: "layoutHeader",
  setup(props, { root }) {
    const navMenuState = () => {
      root.$store.commit("app/SET_COLLASPE");
    };
    const username = computed(() => root.$store.state.login.username);
    const exit = () => {
        root.$confirm("此操作将推出当前系统,是否继续?","提示",{
            confirmButtonText: "确定",
            cancelButtonText: "取消"
        })
        .then(() => {
            root.$store.dispatch("login/exit").then(() => {
                root.$router.push({
                    name: "Login"
                })
            });
            root.$message({
                type: "success",
                message: "退出成功"
            });
        })
        .catch(() => {
            root.$message({
                type: "info",
                message: "已取消退出"
            })
        })
    }
    return {
      navMenuState,
      username,
      exit
    };
  }
};
</script>
<style lang="scss" scoped>
#header_wrap {
  position: fixed;
  right: 0;
  top: 0;
  left: 250px;
  height: 75px;
  background-color: #fff;
  -webkit-box-shadow: 0 3px 16px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-icon {
  svg {
    font-size: 24px;
    cursor: pointer;
  }
  padding-left: 30px;
}
.open {
  #header_wrap {
    left: 250px;
  }
}
.close {
  #header_wrap {
    left: 64px;
  }
}
.right-container{
    display: flex;
    justify-content: center;
    align-items: center;
}
.user-info{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
        width: 37px;
        height: 37px;
        border-radius: 50%;
        display: inline-block;
        margin-right: 5px;
    }  
    +.header-icon{
        padding-right: 30px;
    }
}
</style>