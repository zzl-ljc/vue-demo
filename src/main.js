import Vue from "vue";
// 引入ElementUI组件
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// 使用Vue3.0
import VueCompositionApi from "@vue/composition-api";
// 引入全局组件
import "./icon/index";
// 路由守卫
import "./router/permit";

Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
