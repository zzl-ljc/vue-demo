import service from "@/utils/request";
/**
 * 获取验证码
 */
export function GetSms(data) {
  return service.request({
    method: "post", // 注意是method不是methods
    url: "/getSms/",
    data
  });
}
/**
 * 登录
 */
export function Login(data) {
  return service.request({
    method: "post",
    url: "/login/",
    data
  });
}
/**
 * 注册
 */
export function Register(data) {
  return service.request({
    method: "post",
    url: "/register/",
    data
  });
}
