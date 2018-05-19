Page({
  /**
   * 页面的初始数据
   */
  data: {
    openSourceAddr: "https://github.com/iLifexiao/keyManager",
    mailAddr: "710178950@qq.com"
  },

  showVersion: function(e) {
    wx.navigateTo({
      url: '../setting_showVersion/showVersion',
    })
  },

  copyGitHubAddr: function(e) {
    wx.setClipboardData({
      data: this.data.openSourceAddr,
      success: res=> {
        wx.showToast({
          title: '网址拷贝成功',
          image: '/images/GitHub.png'
        })
      }
    })
  },

  copyQQMailAddr: function (e) {
    wx.setClipboardData({
      data: this.data.mailAddr,
      success: res => {
        wx.showToast({
          title: '邮箱拷贝成功',
          image: '/images/QQMail.png'
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