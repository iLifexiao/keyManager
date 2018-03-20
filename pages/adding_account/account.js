var util = require('../../utils/util.js')
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
      pwdCount: 8,
      remarks: "",
    },
    tempIcon: "/images/keyManager.png",
    tempName: "",
    iconTypeList: ['常用图标', '从相册中选择'],
    iconTypeIndex: 0,
    classify: [],
    classifyIndex: 0,
  },
  selectIcon: function (e) {
    wx.showActionSheet({
      itemList: this.data.iconTypeList,
      itemColor: '#00ADB7',
      success: res => {
        if (!res.cancel) {
          // 记录选择的图片来源
          this.setData({
            iconTypeIndex: res.tapIndex
          })
          switch (res.tapIndex) {
            case 0:
              this.chooseOrdinaryIcon();
              break;
            case 1:
              this.chooseIconWithAlbum();
              break;
            default:
              break;
          }
        }
      }
    })
  },

  chooseIconWithAlbum: function (e) {
    wx.chooseImage({
      count: 1,
      success: res => {
        var tempFilePaths = res.tempFilePaths[0]
        this.setData({
          tempIcon: tempFilePaths
        })
      },
    });
  },

  chooseOrdinaryIcon: function (e) {
    wx.navigateTo({
      url: '../adding_chooseLogo/chooseLogo',
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
    if (this.data.tempName.length == 0) {
      wx.showToast({
        title: '帐号名称不能为空',
        image: '/images/exclamatory-mark.png'
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
    switch (this.data.iconTypeList[this.data.iconTypeIndex]) {
      case '常用图标':
        var account = this.data.account
        account.icon = this.data.tempIcon
        account.name = this.data.tempName
        this.setData({
          account: account
        })
        console.log(account)
        util.addAccount(account)
        break;
      case '从相册中选择':
        wx.saveFile({
          tempFilePath: this.data.tempIcon,
          success: res => {
            var account = this.data.account
            account.icon = res.savedFilePath
            account.name = this.data.tempName
            this.setData({
              account: account
            })
            console.log(account)
            util.addAccount(account)
          }
        })
        break;
      default:
        console.log("图标选择类型错误")
        break;
    }
  },

  // 输入框失去焦点的响应事件
  checkAccountName: function (e) {        
    this.setData({
      tempName: e.detail.value
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
    const accountClassify = wx.getStorageSync('accountClassify')
    const existClassify = util.getExistClassify(accountClassify)
    this.setData({
      classify: existClassify
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
    
  }
})