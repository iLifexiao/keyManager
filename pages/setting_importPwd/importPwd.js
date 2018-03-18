Page({

  /**
   * 页面的初始数据
   */
  data: {
    backInfo: ""
  },

  getBackInfo: function(e) {
    this.setData({
      backInfo: e.detail.value
    })
  },
  importAccount: function(e) {
    if (this.data.backInfo.length == 0) {
      wx.showToast({
        title: '输入内容不能为空',
        image: '/images/exclamatory-mark.png'
      })
      return
    }
    wx.showToast({
      title: '导入成功',
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