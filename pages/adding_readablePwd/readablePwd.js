// 导入全局数据和模块
const app = getApp()
var fun_aes = require('../../utils/aes.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classify: ["AES", "AES(dynamic)"],
    classifyIndex: 0,
    message: "",
    secret: "",
    key: null,
    iv: null
  },

  /**
   * 响应方法
   */
  selectClassify: function (e) {
    const classifyIndex = e.detail.value
    this.setData({
      classifyIndex: classifyIndex,
    })
  },

  checkKey: function (e) {
    this.setData({
      key: e.detail.value
    })
  },
  checkIV: function (e) {
    this.setData({
      iv: e.detail.value
    })
  },

  getMessage: function (e) {
    this.setData({
      message: e.detail.value
    })
  },
  
  creatSecret: function (e) {
    if (this.data.classifyIndex == 1) {
      // 输入信息判断
      if (this.data.key.length != 16 || this.data.iv.length != 16) {
        wx.showToast({
          title: '加密规则格式错误',
          image: '/images/exclamatory-mark.png'
        })
        return
      }
    }

    if (this.data.message.length == 0) {
      wx.showToast({
        title: '明文不能为空',
        image: '/images/exclamatory-mark.png'
      })
      return
    }


    var secret = ""
    const message = this.data.message
    const classify = this.data.classify
    const classifyIndex = this.data.classifyIndex
    switch (classify[classifyIndex]) {
      case "AES":
        secret = this.Encrypt(message);
        break;
      case "AES(dynamic)":
        secret = this.Encrypt(message);
        break;
      default:
        console.log("default");
    }
    this.setData({
      secret: secret
    })
  },

  copySecret: function (e) {
    wx.setClipboardData({
      data: this.data.secret,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '密码拷贝成功',
            })
          }
        })
      }
    })
  },

  /**
   * AES 加密/解密
   */
  Encrypt: function (word) {
    // 动态设置加密信息
    const key = this.data.key
    const iv = this.data.iv
    var srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
    var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: fun_aes.CryptoJS.mode.CBC, padding: fun_aes.CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  },
  Decrypt: function (word) {
    const key = this.data.key
    const iv = this.data.iv
    var encryptedHexStr = fun_aes.CryptoJS.enc.Hex.parse(word);
    var srcs = fun_aes.CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = fun_aes.CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: fun_aes.CryptoJS.mode.CBC, padding: fun_aes.CryptoJS.pad.Pkcs7 });
    var decryptedStr = decrypt.toString(fun_aes.CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //十六位十六进制数作为秘钥(非ECB模式)
    var key = fun_aes.CryptoJS.enc.Utf8.parse(app.globalData.secret.key);
    //十六位十六进制数作为秘钥偏移量(非ECB模式)
    var iv = fun_aes.CryptoJS.enc.Utf8.parse(app.globalData.secret.iv);
    this.setData({
      key: key,
      iv: iv
    })
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})