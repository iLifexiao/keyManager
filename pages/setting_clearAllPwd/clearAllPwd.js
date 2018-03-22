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
  },
  clearAllAccount: function () {
    if (this.data.checkKey.length == 0) {
      wx.showToast({
        title: '请验证身份',
        image: '/images/exclamatory-mark.png'
      })
      return
    }

    const userKey = this.data.userKey
    const checkKey = this.data.checkKey

    // 确认密码
    if (checkKey == userKey) {
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