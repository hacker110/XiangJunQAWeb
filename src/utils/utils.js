/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-11-16 15:58:24
 * @LastEditTime: 2019-11-18 23:48:09
 */
export const trim = (str) => {
  return (str + "").replace(/^\s|\s$/g, "")
}

export const concatUrl = params => {
  if (!Object.keys(params).length) return "";
  let res = "?";
  for (let key in params) {
    res += key + "=" + params[key] + "&";
  }
  return res.replace(/&$/, "");
};

/**
 * 实现base64转成blob
 * @param {*} base64 
 * 步骤：
 * 1.取出加密内容部分，使用atob解码base64的字符串
 * 2.创建一个数组，存储字符串的ASCII值
 * 3.返回一个blob对象(new Blob(a, b) a为[数组], b为{type; ""})
 */
export const imgBase64ToBlob = (base64) => {
  // 对base64操作，去掉URL头，转换为byte
  let splits = base64.split(',');
  const bytes = window.atob(splits[1]);

  // 第一种
  const ab = new ArrayBuffer(bytes.length);
  let ia = new Uint8Array(ab);
  for (let i = 0; i < bytes.length; i++) {
    ia[i] = bytes.charCodeAt(i);
  }
  return new Blob([ab], { type: splits[0].match(/^data:([a-z/]*);base64$/)[1] });

  // 第二种
  // const ab = [];
  // for(var i = 0; i < bytes.length; i++){
  //     ab.push(bytes.charCodeAt(i));
  // }
  // return new Blob([new Uint8Array(ab)], { type: 'image/svg+xml' });
}