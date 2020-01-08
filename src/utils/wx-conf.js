import { Toast } from "antd-mobile";

Toast.loading("加载JS-SDK", 0);
wx.config({
  debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
  appId: "wx0675b4421ecca2e2", // 必填，公众号的唯一标识
  timestamp: "", // 必填，生成签名的时间戳
  nonceStr: "", // 必填，生成签名的随机串
  signature: "", // 必填，签名
  jsApiList: [] // 必填，需要使用的JS接口列表
});
wx.ready(function() {
  Toast.hide();
  //需在用户可能点击分享按钮前就先调用
});
wx.error(function() {
  Toast.hide();
  Toast.fail("JS-SDK配置失败,请重试~", 1);
});
// 自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
const shareCircle = () => {
  wx.updateTimelineShareData({
    title: "", // 分享标题
    link: "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: "", // 分享图标
    success: function() {
      // 设置成功
    }
  });
};
// 自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
const shareFriend = () => {
  wx.updateAppMessageShareData({
    title: "", // 分享标题
    desc: "", // 分享描述
    link: "", // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
    imgUrl: "", // 分享图标
    success: function() {
      // 设置成功
    }
  });
};
// 拍照或从手机相册中选图接口
const chooseImage = () => {
  wx.chooseImage({
    count: 1, // 默认9
    sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
    sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
    success: function(res) {
      const localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      console.log(localIds);
    }
  });
};
export default { shareCircle, shareFriend, chooseImage };
