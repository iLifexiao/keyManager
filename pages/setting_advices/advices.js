Page({

  /**
   * 页面的初始数据
   */
  data: {
    advices: ""
  },
  
  writeAdvicesDone: function(e) {
    const advices = e.detail.value
    this.setData({
      advices: advices
    })
  },

  sendAdvices: function(e) {
    const advices = this.data.advices
    if (advices.length == 0) {
      wx.showToast({
        title: '吐槽框为空',
        image: '/images/exclamatory-mark.png'
      })
      return
    }
    wx.showToast({
      title: '发送成功',
    })    
  },

  reWrite: function(e) {
    this.setData({
      advices: ""
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
    
  }
})