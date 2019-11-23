/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-28 14:25:00
 * @LastEditTime: 2019-11-19 13:21:39
 */
import Axios from "axios";
import { concatUrl } from "./utils";
import { host } from "@/service/api.js";
const qs = require("qs");

export const get = (url, params = {}, options = { showToast: true }) => {
  if (/localhost/gi.test(window.location.host)) {
    url = host + url;
  }
  return Axios.request({
    method: "GET",
    url: url + concatUrl(params)
  })
    .then(res => {
      if (res.data.status === 200) {
        return res.data;
      } else {
        throw Error(res.data.errorMsg);
      }
    })
    .catch(err => {
      console.log(err);
    });
};

export const post = (url, params = {}) => {
  if (/localhost/gi.test(window.location.host)) {
    url = host + url;
  }
  return Axios.request({
    method: "POST",
    headers: {
      // "Content-Type": "application/json"
    },
    url,
    data: qs.stringify(params)
  })
    .then(res => {
      if (res.data.status === 200) {
        return res.data;
      } else {
        throw Error(res.data.errorMsg);
      }
    })
    .catch(err => {
      console.log(err);
    });
};
