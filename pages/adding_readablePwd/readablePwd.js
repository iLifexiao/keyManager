// 导入全局数据和模块
const app = getApp()
var fun_aes = require('../../utils/aes.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classify: ["AES", "AES(Dynamic)"],
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
          title: '规则格式错误',
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
    const classify = this.data.classify    
    switch (classify[this.data.classifyIndex]) {
      case "AES":
        secret = this.Encrypt(this.data.message, this.data.key, this.data.iv);
        break;
      case "AES(动态)":
        secret = this.Encrypt(this.data.message, this.data.key, this.data.iv);
        break;
      default:
        console.log("default")
        break;
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
              title: '密文拷贝成功',
            })
          }
        })
      }
    })
  },

  /**
  * AES 加密
  */
  Encrypt: function (word, key, iv) {
    var srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
    var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: fun_aes.CryptoJS.mode.CBC, padding: fun_aes.CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
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
  }
})