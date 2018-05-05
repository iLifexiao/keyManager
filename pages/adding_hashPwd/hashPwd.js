const fun_md5 = require('../../utils/md5.js')
const fun_sha1 = require('../../utils/sha1.js')
const fun_base64 = require('../../utils/base64.js')
const util = require('../../utils/util.js')

Page({
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
    if (util.isEmptyInput(this.data.message, "输入不能为空")) {
      return
    }
    this.setData({
      secret: this.encodeMessage(this.data.message)
    })
  },

  /**
   * 加密信息
   */
  encodeMessage: function (message) {
    switch (this.data.classify[this.data.classifyIndex]) {
      case "MD5":
        return fun_md5.hex_md5(message);
        break;
      case "SHA1":
        return fun_sha1.hex_sha1(message);
        break;
      case "BASE64":
        const obj_base64 = new fun_base64.Base64();
        return obj_base64.encode(message);
        break;
      default:
        return "编码分类发生错误..."
    }
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