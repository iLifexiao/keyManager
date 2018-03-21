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
  },
  checkKey: function(e) {
    this.setData({
      key: e.detail.value
    })
  },
  checkIV: function(e) {
    this.setData({
      iv: e.detail.value
    })
  },
  changeRules: function(e) {
    const checkKey = this.data.checkKey
    if (checkKey.length == 0) {
      wx.showToast({
        title: '请验证身份',
        image: '/images/exclamatory-mark.png'
      })
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
      wx.setStorage({
        key: 'secret',
        data: changedRule,
        success: res=> {
          wx.showToast({
            title: '规则修改成功',
          })
        },
        fail: res=> {
          wx.showToast({
            title: '修改失败',
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
    const userKey = userKeyArray.join("")
    this.setData({
      userKey: userKey
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
    
  }
})