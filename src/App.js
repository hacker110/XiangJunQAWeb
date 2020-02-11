/*
 * @Description: This is a description
 * @Author: Ask
 * @LastEditors: Ask
 * @Date: 2019-10-27 20:46:59
 * @LastEditTime: 2019-11-06 20:45:58
 */
// @flow
import {
  Component
} from 'react';
import '@commonScss/index.scss';

import router from './router/router.js';
import {
  post
} from "@/utils/request.js";
import {
  CONFIG
} from "@/service/api.js";
const wx = window.wx

class App extends Component < {}, {} > {
  constructor() {
    super();
    this.getWxconfig()
  }

  getWxconfig() {
    // alert(location.href.split('#')[0])

    post(CONFIG.GET_WX_CONFIG, {
      url: encodeURIComponent(window.location.href.split('#')[0])
    }).then(res => {

      console.log(res.data);
      const {
        appId,
        timestamp,
        nonceStr,
        signature
      } = res.data;
      console.log(appId,
        timestamp,
        nonceStr,
        signature)

      wx.config({
        debug: true,
        appId,
        timestamp,
        nonceStr,
        signature,
        jsApiList: ['chooseImage', 'previewImage', 'uploadImage', 'downloadImage']
      })
      wx.ready(function () {
        console.log("ready")
        console.log("chooseImage")
        wx.chooseImage({
          count: 1, // 默认9
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
            console.log(res);
            // var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片

          }

        });
      })
    });
  }
  render() {
    return router();
  }
}

export default App;