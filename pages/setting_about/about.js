Page({

  /**
   * 页面的初始数据
   */
  data: {
    openSourceAddr: "https://github.com/iLifexiao/hello-world",
    mailAddr: "710178950@qq.com"
  },

  copyGitHubAddr: function(e) {
    wx.setClipboardData({
      data: this.data.openSourceAddr,
      success: res=> {
        wx.showToast({
          title: '代码地址拷贝成功',
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
          title: '邮箱地址拷贝成功',
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
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})