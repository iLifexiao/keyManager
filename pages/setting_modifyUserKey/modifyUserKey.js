//获取应用实例
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
  checkOldPassword: function (e) {
    this.setData({
      oldPwd: e.detail.value
    })
  },
  checkNewPassword: function (e) {
    this.setData({
      newPwd: e.detail.value
    })
  },
  checkSamePassword: function (e) {
    this.setData({
      checkPwd: e.detail.value
    })
  },
  changePassword: function(e) {    
    const oldPwd = this.data.oldPwd
    if (oldPwd.length == 0) {
      wx.showToast({
        title: '请验证身份',
        image: '/images/exclamatory-mark.png'
      })
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
          console
          newPwdArray.push(newPwd.charAt(i))
        }
        console.log(newPwdArray)      
        wx.setStorage({
          key: 'primary',
          data: newPwdArray,
          success: res => {
            wx.showToast({
              title: '修改成功',
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
    }
    else {
      wx.showToast({
        title: '原密码错误',
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
  }
})