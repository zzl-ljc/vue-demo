import { Login } from "@/api/login";
import {
  getUsername,
  setToken,
  setUsername,
  removeToken,
  removeUsername
} from "../../utils/app";

const state = {
  token: "",
  username: getUsername() || "" // 千万注意括号别少了
};
const mutations = {
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  }
};
const actions = {
  login(content, data) {
    return new Promise(resolve => {
      Login(data)
        .then(response => {
          // console.log(response);
          content.commit("SET_TOKEN", data.token);
          content.commit("SET_USERNAME", data.username);
          setToken(data.token);
          setUsername(data.username);
          resolve(response);
        })
        .catch(error => {
          console.log(error);
        });
    });
  },
  // 退出
  exit(content) {
    return new Promise(resolve => {
      removeToken();
      removeUsername();
      content.commit("SET_TOKEN", "");
      content.commit("SET_USERNAME", "");
      resolve();
    });
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};
