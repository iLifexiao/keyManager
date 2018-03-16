//index.js
//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    inputShowed: false,
    inputVal: "",
    imageURL: "../../images/defaultBG.jpeg",
    imageFlag: false,
    accountClassify: [
      {
        "name": "全部",
        "iconPath": "../../images/all.png",
        "url":""
      },
      {
        "name": "社交",
        "iconPath": "../../images/talk.png",
        "url": ""
      },
      {
        "name": "游戏",
        "iconPath": "../../images/game.png",
        "url": ""
      },
      {
        "name": "论坛",
        "iconPath": "../../images/bbs.png",
        "url": ""
      },
      {
        "name": "学习",
        "iconPath": "../../images/study.png",
        "url": ""
      },
      {
        "name": "金融",
        "iconPath": "../../images/money.png",
        "url": ""
      },
      {
        "name": "添加",
        "iconPath": "../../images/addClass.png",
        "url": ""
      }
    ]
  },
  /** 
   * 搜索框函数
   */ 
  showInput: function () {
    this.setData({
      inputShowed: true
    });
    console.log("showInput")
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
    console.log("hideInput")
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
    console.log("clearInput")
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
    console.log("inputTyping")
  },

  /**
   * changeImage
   */

  showInfo: function(e) {
    var flag = this.data.imageFlag
    let imgURL = flag ? "https://unsplash.it/375/150/?random" : "https://unsplash.it/376/151/?random"
    this.setData({
      imageURL: imgURL,
      imageFlag: !flag
    });
    wx.showToast({
      title: '更换壁纸中...',
      icon: "loading",
      duration: 1000
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})