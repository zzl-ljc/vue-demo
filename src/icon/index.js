import Vue from "vue";
import svgIcon from "./svgIcon.vue";
Vue.component("svg-icon", svgIcon);

/**
 * 解析文件
 * require.context(‘./svg’,false,/\.svg$/) 参数说明：
    第一个：目录
    第二个：是否遍历子级目录
    第三个：定义遍历文件规则  下面是正则中读取.svg结尾的
 */
const req = require.context("./svg", false, /\.svg$/);
const requireAll = requireContext => {
  console.log(requireContext.keys());
  return requireContext.keys().map(requireContext);
};
requireAll(req);