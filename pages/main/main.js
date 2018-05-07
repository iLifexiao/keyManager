const util = require('../../utils/util.js')
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    imageURL: "/images/defaultBG.jpeg",
    isOpenRandomImg: '0',
    accountClassify: [],    
  },

  /**
   * 搜索框
   */
  searchStart: function (e) {
    const searchKey = e.detail.value
    if (util.isEmptyInput(searchKey, "请输入关键词")) {
      return
    }
    const accountList = util.getSearchAccountWith(searchKey, app.globalData.accountList)
    if (util.isEmptyInput(accountList, 'Nothing...')) { 
      return
    } 
    this.jumpToResultPage(accountList)
  },

  /**
   * 跳转到搜索结果
   * 对于复杂数据的传递采用 JSON.stringify
   */
  jumpToResultPage: function (accountList) {    
    wx.navigateTo({
      url: "../showAccount/showaccount?accountListJson=" + JSON.stringify({ "value": accountList }),
    })  
  },

  /**
   * 开启随机壁纸
   */
  randomBGButton: function() {
    var isOpenRandomImg = this.data.isOpenRandomImg
    if (isOpenRandomImg == '1') {
      isOpenRandomImg = '0'
      this.updateImageStatue(isOpenRandomImg, '关闭随机壁纸')
    } else {
      isOpenRandomImg = '1'
      this.updateImageStatue(isOpenRandomImg, '开启随机壁纸')
    }        
  },

  /**
   * 更新每日壁纸状态
   */
  updateImageStatue: function (statue, info) {
    this.setData({
      isOpenRandomImg: statue
    })
    app.globalData.isOpenRandomImg = statue
    wx.setStorage({
      key: 'randomImg',
      data: statue,
      success: res=> {
        wx.showToast({
          title: info,
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const isOpenRandomImg = app.globalData.isOpenRandomImg
    if (isOpenRandomImg == '1') {
      this.setData({
        imageURL: "https://picsum.photos/375/200/?random"
      })
    }
    this.setData({
      accountClassify: app.globalData.accountClassify,
      isOpenRandomImg: isOpenRandomImg
    })
  },
})