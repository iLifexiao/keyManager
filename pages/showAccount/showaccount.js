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

  /**
   * 显示详细的帐号信息
   */
  showDetail: function (e) {    
    const account = e.currentTarget.dataset.account
    // 数组对象的比较还包括了指针, 所以即使内容完全一样，也无法查找到
    const accountIndex = util.getAccountIndexInStore(account)    
    wx.navigateTo({
      url: '../adding_randomPwd/randomPwd?accountJSON=' + JSON.stringify(account) + '&accountIndex=' + accountIndex,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断跳转类型
    var tempType = options.type || ""
    if (tempType == "") {
      wx.setNavigationBarTitle({
        title: "搜索结果",
      })
      const accountDict = JSON.parse(options.accountListJson)
      const accountList = accountDict.value
      this.setData({
        accountList: accountList
      })
    } else {
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