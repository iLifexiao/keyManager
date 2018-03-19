var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    accType: "",
    accountList: [],
    emptyInfo: "",    
  },
  showDetail: function (e) {
    const account = e.currentTarget.dataset.account
    console.log(account)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tempType = options.type    
    wx.setNavigationBarTitle({
      title: tempType + '帐号',
    })    
    const accountList = util.getAccountWith(tempType)    
    this.setData({
      accType: tempType,
      accountList: accountList
    })
    if (accountList.length == 0) {
      this.setData({
        emptyInfo: "暂无 " + tempType + "帐号 数据"        
      })
    }
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