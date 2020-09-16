// 存储初始化数据
const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
};
// 对state数据的二次处理
const getters = {
  isCollapse: state => state.isCollapse
};
// 对数据计算全部放在里面 在页面触发时调用
const mutations = {
  SET_COLLASPE(state) {
    state.isCollapse = !state.isCollapse;
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  }
};

// 采用命名空间的方法
export default {
  namespaced: true,
  state,
  getters,
  mutations
};
