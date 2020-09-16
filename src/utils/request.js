// 引入拦截器
import axios from "axios";
// 单独引入Element组件
import { Message } from "element-ui";
// 基础路径通过环境变量判断开发环境下用/api
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/devapi";
// 创建axios赋给service
const service = axios.create({
  baseURL: BASEURL, // API:http://www.web-jshtml.cn/productapi,动态代理: http://localhost:8088/devapi
  timeout: 15000 // 超时
});
// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做什么事
    return config;
  },
  // 对请求错误做什么
  error => {
    return Promise.reject(error);
  }
);
// 添加相应拦截器
service.interceptors.response.use(
  response => {
    let data = response.data;
    if (data.resCode != 0) {
      Message.error(data.message);
      return Promise.reject(data);
    }
    return response;
  },
  error => {
    return Promise.reject(error);
  }
);
export default service;
