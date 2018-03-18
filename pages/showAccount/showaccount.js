Page({

  /**
   * 页面的初始数据
   */
  data: {
    accType: ["全部帐号", "社交帐号", "游戏帐号", "学习帐号", "金融帐号", "论坛帐号", "邮箱帐号", "其他帐号"],
    typeIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const typeIndex = options.type
    const accType = this.data.accType
    wx.setNavigationBarTitle({
      title: accType[typeIndex],
    })
    this.setData({
      typeIndex: typeIndex
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
    
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})