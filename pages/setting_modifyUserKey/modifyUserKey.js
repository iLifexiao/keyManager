const util = require('../../utils/util.js')
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    userKey: "",
    oldPwd: "",
    newPwd: "",
    checkPwd: ""
  },

  checkOldPassword: function(e) {
    this.setData({
      oldPwd: e.detail.value
    })
    //收起键盘
    util.hideKeyboard(e.detail.value, 6)
  },

  checkNewPassword: function(e) {
    this.setData({
      newPwd: e.detail.value
    })
    //收起键盘
    util.hideKeyboard(e.detail.value, 6)
  },

  checkSamePassword: function(e) {
    this.setData({
      checkPwd: e.detail.value
    })
    //收起键盘
    util.hideKeyboard(e.detail.value, 6)
  },

  changePassword: function(e) {
    const oldPwd = this.data.oldPwd
    if (util.isEmptyInput(oldPwd, '请验证身份')) {
      return
    }

    const userKey = this.data.userKey
    const newPwd = this.data.newPwd
    const checkPwd = this.data.checkPwd

    // 判断密码的格式是否正确
    if (oldPwd.length != 6 || newPwd.length != 6 || checkPwd.length != 6) {
      wx.showToast({
        title: '密码格式错误',
        image: '/images/exclamatory-mark.png'
      })
      return
    }

    // 确认密码
    if (oldPwd == userKey) {
      if (newPwd == checkPwd) {
        var newPwdArray = []
        for (var i = 0; i < newPwd.length; ++i) {
          newPwdArray.push(newPwd.charAt(i))
        }
        console.log(newPwdArray)
        wx.setStorage({
          key: 'primary',
          data: newPwdArray,
          success: res => {
            // 更新缓存的信息
            app.globalData.userKey = newPwdArray
            wx.navigateBack({
              complete: res => {
                wx.showToast({
                  title: '修改成功',
                })
              }
            })
          },
          fail: res => {
            wx.showToast({
              title: '修改失败',
              image: "/images/error.png"
            })
          }
        })

        // 修改当前密码
        this.setData({
          userKey: newPwd
        })
      } else {
        wx.showToast({
          title: '密码不一致',
          image: '/images/exclamatory-mark.png'
        })
      }
    } else {
      wx.showToast({
        title: '原密码错误',
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