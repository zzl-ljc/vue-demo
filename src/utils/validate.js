/**
 * 过滤特殊字符
 */
export function stripscript(str) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）& ;—|{}【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < str.length; i++) {
    rs = rs + str.substr(i, 1).replace(pattern, "");
  }
  return rs;
}
/**
 * 邮箱验证规则
 */

export function emailValidate(value) {
  // eslint-disable-next-line no-useless-escape
  let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
  return reg.test(value) ? true : false;
}

/**
 * 验证密码
 */
export function passValidate(value) {
  let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,16}$/;
  return reg.test(value) ? true : false;
}

/**
 * 验证验证码
 */
export function codeValidate(value) {
  let reg = /^[a-z0-9]{6}$/;
  return reg.test(value) ? true : false;
}

/**
 *没有使用export default时 可以有多个export 文件引用import时需要有花括号
 */
