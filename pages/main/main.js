var util = require('../../utils/util.js')
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageURL: "/images/defaultBG.jpeg",
    imageW: 375,
    imageH: 200,
    accountClassify: [],    
  },

  // 点击搜索
  searchStart: function (e) {
    const searchKey = e.detail.value
    if (util.isEmptyInput(searchKey, "请输入关键词")) {
      return
    }

    const accountList = util.getSearchAccountWith(searchKey, app.globalData.accountList)
    if (util.isEmptyInput(accountList, '没有 ' + searchKey + '帐号信息')) { 
      return
    } 
    // 对于复杂数据 采用 JSON.stringify
    wx.navigateTo({
      url: "../showAccount/showaccount?accountListJson=" +  JSON.stringify({"value": accountList}),
    })    
  },

  // changeImage  
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
      title: '换个心情...',
      icon: "loading",
      duration: 1500
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {    
    this.setData({
      accountClassify: app.globalData.accountClassify
    })
  }
})