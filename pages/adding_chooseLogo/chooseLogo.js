Page({

  /**
   * 页面的初始数据
   */
  data: {
    logoClassify: [
      {
        "type": "通信",
        "icons": [
          { "name": "新浪微博", "path": "/images/logo/sinaweibo.png" },
          { "name": "QQ", "path": "/images/logo/tencent.png" },
          { "name": "微信", "path": "/images/logo/wechat.png" },
          { "name": "QQ邮箱", "path": "/images/logo/qqmail.png" },
          { "name": "网易", "path": "/images/logo/netease.png" },
          { "name": "网易邮箱", "path": "/images/logo/mobimail.png" },
          { "name": "领英", "path": "/images/logo/linkedin.png" },
          { "name": "移动", "path": "/images/logo/10086.png" },
        ]
      },
      {
        "type": "金融",
        "icons": [
          { "name": "亚马逊", "path": "/images/logo/amazon.png" },
          { "name": "农业银行", "path": "/images/logo/bankabc.png" },
          { "name": "建设银行", "path": "/images/logo/chinamworld.png" },
          { "name": "翼支付", "path": "/images/logo/bestpayclient.png" },
          { "name": "支付宝", "path": "/images/logo/Alipay.png" },
          { "name": "工商银行", "path": "/images/logo/icbc.png" },
          { "name": "银联", "path": "/images/logo/unionpay.png" },
          { "name": "京东钱包", "path": "/images/logo/payment.png" },
        ]
      },
      {
        "type": "娱乐",
        "icons": [
          { "name": "Bilibili", "path": "/images/logo/bili.png" },
          { "name": "ACFun", "path": "/images/logo/acfun.png" },
          { "name": "虾米音乐", "path": "/images/logo/xiami.png" },
          { "name": "猫眼电影", "path": "/images/logo/sankuai.png" },
        ]
      },
      {
        "type": "生活",
        "icons": [
          { "name": "百度地图", "path": "/images/logo/BaiduMap.png" },
          { "name": "薄荷", "path": "/images/logo/boohee.png" },
          { "name": "京东", "path": "/images/logo/jingdong.png" },
          { "name": "美团", "path": "/images/logo/meituan.png" },
          { "name": "饿了吗", "path": "/images/logo/ele.png" },
          { "name": "滴滴", "path": "/images/logo/didi.png" },
          { "name": "苏宁易购", "path": "/images/logo/suning.png" },
          { "name": "闲鱼", "path": "/images/logo/fleamarket.png" },
          { "name": "淘宝", "path": "/images/logo/taobao.png" },
          { "name": "天猫", "path": "/images/logo/tmall.png" },
          { "name": "携程旅行", "path": "/images/logo/ctrip.png" },
          { "name": "大众点评", "path": "/images/logo/dianping.png" },

        ]
      },
      {
        "type": "学习",
        "icons": [
          { "name": "火狐", "path": "/images/logo/firefox.png" },
          { "name": "TED", "path": "/images/logo/ted.png" },
          { "name": "映像笔记", "path": "/images/logo/evernote.png" },
          { "name": "谷歌", "path": "/images/logo/chrome.png" },
          { "name": "智联招聘", "path": "/images/logo/zhaopin.png" },
          { "name": "豆瓣", "path": "/images/logo/douban.png" },
          { "name": "全能扫描王", "path": "/images/logo/camscanner.png" },
          { "name": "百词斩", "path": "/images/logo/card.png" },
          { "name": "扇贝单词", "path": "/images/logo/shanbay.png" },
        ]
      },
    ]
  },

  /**
   * 这里需要用到反向传值
   * 一、可以使用 getCurrentPages 来获取到堆栈的页面，然和设置即可
   * 二、可以通过设置数据存储 wx.setStorage
   */
  selectIcon: function (e) {
    var pages = getCurrentPages()
    const iconPath = e.currentTarget.dataset.path
    const iconName = e.currentTarget.dataset.name
    var that = pages[pages.length - 2]

    if (that.__route__ == "pages/adding_randomPwd/randomPwd") {
      wx.navigateBack({
        delta: 1,
        success: res => {
          // 回传 图标路径 & 图标名字
          that.setData({
            tempIcon: iconPath,
            tempName: iconName
          })
        }
      })
    } else if (that.__route__ == "pages/adding_account/account") {
      wx.navigateBack({
        delta: 1,
        success: res => {
          // 回传 图标路径 & 图标名字
          that.setData({
            tempIcon: iconPath,
            tempName: iconName
          })
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})