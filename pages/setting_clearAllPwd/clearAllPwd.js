const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userKey: "",
    checkKey: ""
  },
  checkUserKey: function (e) {
    this.setData({
      checkKey: e.detail.value
    })
  },
  clearAllAccount: function() {
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
      wx.showToast({
        title: '清空完成',
      })
      /*
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
      */
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
    var userKey = ""
    for (var i = 0; i < userKeyArray.length; ++i) {
      userKey = userKey.concat(userKeyArray[i].toString())
    }
    this.setData({
      userKey: userKey
    })
  },
})