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
    imageURL: "/images/defaultBG.jpeg",
    imageW: 375,
    imageH: 200,
    accountClassify: [
      {
        "name": "全部",
        "iconPath": "/images/all.png",
        "url":"../showAccount/showaccount?type=0"
      },
      {
        "name": "社交",
        "iconPath": "/images/talk.png",
        "url": "../showAccount/showaccount?type=1"
      },
      {
        "name": "游戏",
        "iconPath": "/images/game.png",
        "url": "../showAccount/showaccount?type=2"
      },
      {
        "name": "学习",
        "iconPath": "/images/study.png",
        "url": "../showAccount/showaccount?type=3"
      },
      {
        "name": "金融",
        "iconPath": "/images/money.png",
        "url": "../showAccount/showaccount?type=4"
      },
      {
        "name": "论坛",
        "iconPath": "/images/bbs.png",
        "url": "../showAccount/showaccount?type=5"
      },
      {
        "name": "邮箱",
        "iconPath": "/images/mail.png",
        "url": "../showAccount/showaccount?type=6"
      },
      {
        "name": "其他",
        "iconPath": "/images/others.png",
        "url": "../showAccount/showaccount?type=7"
      },
      {
        "name": "添加",
        "iconPath": "/images/addClass.png",
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
    var imageW = this.data.imageW + 1
    var imageH = this.data.imageH + 1
    var imageURL = "https://unsplash.it/" + imageW + "/" + imageH +"/?random"
    
    this.setData({
      imageURL: imageURL,
      imageW: imageW,
      imageH: imageH
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})