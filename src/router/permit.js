import router from "./index";
import store from "../store/index";
import { getToekn, removeToken, removeUsername } from "../utils/app";

// 路由白名单
const whiteRouter = ["/login"];
router.beforeEach((to, from, next) => {
  if (getToekn()) {
    if (to.path === "/login") {
      removeToken();
      removeUsername();
      store.commit("login/SET_TOKEN", "");
      store.commit("login/SET_USERNAME", "");
      next();
    } else {
      next();
    }
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      next();
    } else {
      next("/login");
    }
  }
});
