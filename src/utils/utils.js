/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-11-16 15:58:24
 * @LastEditTime: 2019-11-18 23:48:09
 */
export const trim = (str) =>{
  return (str+"").replace(/^\s|\s$/g,"")
}

export const concatUrl = params => {
  if(!Object.keys(params).length) return "";
  let res = "?";
  for (let key in params) {
    res += key + "=" + params[key] + "&";
  }
  return res.replace(/&$/, "");
};