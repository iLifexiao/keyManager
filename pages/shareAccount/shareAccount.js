Page({
  /**
   * 页面的初始数据
   */
  data: {
    account: {
      icon: "/images/keyManager.png",
      kind: "社交",
      name: "",
      acc: "",
      pwd: "",
      secPwd: "",
      pwdCount: 8,
      remarks: "",
    }
  },

  /**
   * 拷贝密码
   */
  copyPwd: function (e) {
    const pwd = this.data.account.pwd
    const secPwd = this.data.account.secPwd

    if (this.data.account.kind == "游戏") {
      if (pwd.length != 0 || secPwd.length != 0) {
        wx.setClipboardData({
          data: pwd + "/" + secPwd,
          success: function (res) {
            wx.getClipboardData({
              success: function (res) {
                wx.showToast({
                  title: '游戏拷贝成功',
                })
              }
            })
          }
        })
      } else {
        wx.showToast({
          title: '还未填写密码',
          image: '/images/exclamatory-mark.png'
        })
      }
      return
    }

    if (pwd.length != 0) {
      wx.setClipboardData({
        data: pwd,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '密码拷贝成功',
              })
            }
          })
        }
      })
    } else {
      wx.showToast({
        title: '还未填写密码',
        image: '/images/exclamatory-mark.png'
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const accountJSON = options.accountJSON || ""
    if (accountJSON != "") {
      const account = JSON.parse(options.accountJSON)
      this.setData({
        account: account,    
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: this.data.tempName + '(帐号分享)',
      path: '/pages/shareAccount/shareAccount?accountJSON=' + JSON.stringify(this.data.account),
      imageUrl: this.data.tempIcon,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})