Page({

  /**
   * 页面的初始数据
   */
  data: {
    account: {
      icon: "/images/keyManager.png",
      kind: "社交",
      name: "",
      acc: "",
      pwd: "",
      secPwd: "",
      pwdCount: 6,
      remarks: "",
    },
    classify: ["社交", "游戏", "论坛", "学习", "金融"],
    classifyIndex: 0,
  },
  selectIcon: function (e) {
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function (res) {
            var savedFilePath = res.savedFilePath
            console.log(savedFilePath)

          }
        })
      }
    })
  },
  selectClassify: function (e) {
    var account = this.data.account
    const classifyIndex = e.detail.value
    account.kind = this.data.classify[classifyIndex]
    this.setData({
      classifyIndex: classifyIndex,
      account: account
    })
  },
  saveAccount: function (e) {
    // 输入信息判断
    if (this.data.account.name.length == 0) {
      wx.showToast({
        title: '帐号名称不能为空',
        image: '/exclamatory-mark.png'
      })
      return
    }
    if (this.data.account.acc.length == 0) {
      wx.showToast({
        title: '帐号不能为空',
        image: '/images/exclamatory-mark.png'
      })
      return
    }
    if (this.data.account.pwd.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        image: '/images/exclamatory-mark.png'
      })
      return
    }
    console.log(this.data.account)
  },

  // 输入框失去焦点的响应事件
  checkAccountName: function (e) {
    var account = this.data.account
    account.name = e.detail.value
    this.setData({
      account: account
    })
  },
  checkAccount: function (e) {
    var account = this.data.account
    account.acc = e.detail.value
    this.setData({
      account: account
    })
  },
  checkPassword: function(e) {
    var account = this.data.account
    account.pwd = e.detail.value
    account.pwdCount = e.detail.value.length
    this.setData({
      account: account
    })
  },
  checkSecondPassword: function (e) {
    var account = this.data.account
    account.secPwd = e.detail.value
    this.setData({
      account: account
    })
  },
  checkRemarks: function (e) {
    var account = this.data.account
    account.remarks = e.detail.value
    this.setData({
      account: account
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