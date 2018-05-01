var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userKey: "",
    checkKey: "",
    supportFinger: "0",
    openFingerPrint: "0"
  },

  checkUserKey: function (e) {
    this.setData({
      checkKey: e.detail.value
    })
  },

  settingFingerPrint: function (e) {
    const settingType = e.currentTarget.dataset.setting
    if (this.data.checkKey.length == 0) {
      wx.showToast({
        title: '请验证身份',
        image: '/images/exclamatory-mark.png'
      })
      return
    }
    let userKey = this.data.userKey
    if (userKey == this.data.checkKey) {
      if (settingType == "open") {
        wx.setStorage({
          key: 'openFingerPrint',
          data: '1',
          success: res => {
            app.globalData.openFingerPrint = "1"
            wx.navigateBack({
            })
            wx.showToast({
              title: '开启成功',
            })
          }
        })
      }
      else if (settingType == "close") {
        wx.setStorage({
          key: 'openFingerPrint',
          data: '0',
          success: res => {
            app.globalData.openFingerPrint = "0"
            wx.navigateBack({              
            })
            wx.showToast({
              title: '关闭成功',
            })
          }
        })
      }
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
    const userKey = userKeyArray.join("")
    const supportFinger = app.globalData.supportFinger
    const openFingerPrint = app.globalData.openFingerPrint


    this.setData({
      userKey: userKey,
      openFingerPrint: openFingerPrint,
      supportFinger: supportFinger
    })
  },
})