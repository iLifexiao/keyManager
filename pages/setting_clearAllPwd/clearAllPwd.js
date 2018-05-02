const util = require('../../utils/util.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userKey: "",
    checkKey: "",
    accountList: []
  },

  checkUserKey: function (e) {
    this.setData({
      checkKey: e.detail.value
    })
    //收起键盘
    util.hideKeyboard(e.detail.value, 6)    
  },

  clearAllAccount: function () {
    if (util.isEmptyInput(this.data.checkKey, '请验证身份')) {
      return
    }

    const checkKey = this.data.checkKey
    // 确认密码
    if (checkKey == this.data.userKey) {
      app.globalData.accountList = []
      wx.setStorage({
        key: 'account',
        data: [],
        success: res => {
          wx.navigateBack({
            complete: res => {
              wx.showToast({
                title: '清空完成',
              })
            }
          })
        },
        fail: res => {
          wx.showToast({
            title: '清空失败',
            image: "/images/error.png"
          })
        }
      })
    }
    else {
      wx.showToast({
        title: '密码错误',
        image: "/images/error.png"
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userKeyArray = app.globalData.userKey
    var userKey = userKeyArray.join("")

    // 判断是否有可导出帐号
    const accountList = app.globalData.accountList
    if (accountList.length > 0) {
      this.setData({
        userKey: userKey,
        accountList: accountList
      })
    }
  },
})