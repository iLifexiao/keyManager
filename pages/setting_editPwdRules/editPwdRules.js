const util = require('../../utils/util.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userKey: "",
    checkKey: "",
    key: "",
    iv: "",
  },
  checkUserKey: function(e) {
    this.setData({
      checkKey: e.detail.value
    })
    //收起键盘
    util.hideKeyboard(e.detail.value, 6)
  },
  checkKey: function(e) {
    this.setData({
      key: e.detail.value
    })
    //收起键盘
    util.hideKeyboard(e.detail.value, 16)
  },
  checkIV: function(e) {
    this.setData({
      iv: e.detail.value
    })
    //收起键盘
    util.hideKeyboard(e.detail.value, 16)
  },

  changeRules: function(e) {
    const checkKey = this.data.checkKey
    if (util.isEmptyInput(checkKey, "请验证身份")) {
      return
    }
    const userKey = this.data.userKey
    const key = this.data.key
    const iv = this.data.iv

    // 判断密码的格式是否正确
    if (key.length != 16 || iv.length != 16) {
      wx.showToast({
        title: '规则格式错误',
        image: '/images/exclamatory-mark.png'
      })
      return
    }

    // 确认密码
    if (checkKey == userKey) {
      const changedRule = {
        "key": key,
        "iv": iv
      }
      // 修改全局变量，提高速度访问
      app.globalData.secret = changedRule

      wx.setStorage({
        key: 'secret',
        data: changedRule,
        success: res => {
          wx.showToast({
            title: '规则修改成功',
          })
        },
        fail: res => {
          wx.showToast({
            title: '修改失败',
            image: "/images/error.png"
          })
        }
      })
    } else {
      wx.showToast({
        title: '密码错误',
        image: "/images/error.png"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const userKeyArray = app.globalData.userKey
    const userKey = userKeyArray.join("")
    this.setData({
      userKey: userKey
    })
  }
})