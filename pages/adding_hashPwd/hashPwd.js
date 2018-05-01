var fun_md5 = require('../../utils/md5.js')
var fun_sha1 = require('../../utils/sha1.js')
var fun_base64 = require('../../utils/base64.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    classify: ["MD5", "SHA1", "BASE64"],
    classifyIndex: 0,
    message: "",
    secret: "",    
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
  getMessage: function (e) {
    this.setData({
      message: e.detail.value
    })
  },

  /**
   * 创建信息编码
   */
  creatSecret: function (e) {
    if (this.data.message.length == 0) {
      wx.showToast({
        title: '编码信息不能为空',
        image: '/images/exclamatory-mark.png'
      })
      return
    }

    var secret = ""
    const message = this.data.message
    const classify = this.data.classify    
    switch (classify[this.data.classifyIndex]) {
      case "MD5":
        secret = fun_md5.hex_md5(message);
        break;
      case "AES":        
        secret = this.Encrypt(message);
        break;
      case "SHA1":
        secret = fun_sha1.hex_sha1(message);
        break;
      case "BASE64":
        var obj_base64 = new fun_base64.Base64();
        secret = obj_base64.encode(message);
        break;
      default:
        console.log("default");
    }
    this.setData({
      secret: secret
    })
  },

  /**
   * 拷贝信息编码
   */
  copySecret: function (e) {
    wx.setClipboardData({
      data: this.data.secret,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '编码拷贝成功',
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})