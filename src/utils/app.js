import cookie from "cookie_js";
const adminToken = "admin_token";
const username = "username";
export function getToekn() {
  return cookie.get(adminToken);
}
export function setToken(toKen) {
  return cookie.set(adminToken, toKen);
}
export function removeToken() {
  return cookie.remove(adminToken);
}
export function setUsername(value) {
  return cookie.set(username, value);
}
export function getUsername() {
  return cookie.get(username);
}
export function removeUsername() {
  return cookie.remove(username);
}
