var util = require('../../utils/util.js')
//index.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputing: false,
    inputVal: "",
    imageURL: "/images/defaultBG.jpeg",
    imageW: 375,
    imageH: 200,
    accountClassify: []
  },

  searchStart: function (e) {
    const searchKey = e.detail.value
    if (searchKey == "") {
      wx.showToast({
        title: '请输入关键词',
        image: '/images/exclamatory-mark.png'
      })
    }
    else {
      const accountList = util.getSearchAccountWith(searchKey, app.globalData.accountList)
      if (accountList.length == 0) {
        wx.showToast({
          title: '没有该记录',
          image: '/images/exclamatory-mark.png'
        })
      } else {
        // 对于复杂数据 采用 JSON.stringify
        wx.navigateTo({
          url: "../showAccount/showaccount?accountListJson="+  JSON.stringify({"value": accountList}),
        })
      }
    }
  },

  /**
   * changeImage
   */
  showInfo: function (e) {
    var imageW = this.data.imageW + 1
    var imageH = this.data.imageH + 1
    var imageURL = "https://picsum.photos/" + imageW + "/" + imageH + "/?random"

    this.setData({
      imageURL: imageURL,
      imageW: imageW,
      imageH: imageH
    });
    
    wx.showToast({
      title: '更换壁纸中...',
      icon: "loading",
      duration: 1500
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const accountClassify = app.globalData.accountClassify
    this.setData({
      accountClassify: accountClassify
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