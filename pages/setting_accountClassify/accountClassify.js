const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    urlType: 0,
    accountClassify: [],
    tempIconPath: "/images/package.png",
    tempName: "",
    tempUrl: "",
    classify: {
      "name": "",
      "iconPath": "/images/package.png",
      "url": ""
    },
  },

  selectIcon: function (e) {
    wx.chooseImage({
      count: 1,
      success: res => {
        var tempFilePaths = res.tempFilePaths[0]
        this.setData({
          tempIconPath: tempFilePaths
        })
      },
    });
  },

  addAccountClassify: function (e) {
    const tempName = this.data.tempName
    if (tempName.length == 0) {
      wx.showToast({
        title: '名称不能为空',
        image: '/images/exclamatory-mark.png'
      })
      return
    }

    const tempUrl = "../showAccount/showaccount?type=" + tempName
    // 判断是否更改了默认图标    
    if (this.data.tempIconPath == '/images/package.png') {      
      this.setData({
        classify: {
          "name": tempName,
          "iconPath": "/images/package.png",
          "url": tempUrl
        }
      })
      console.log(this.data.classify)
      this.addNewClassify(this.data.classify)
      this.updateAccountClassifyData(this.data.accountClassify)
    } else {
      wx.saveFile({
        tempFilePath: this.data.tempIconPath,
        success: res => {
          this.setData({
            classify: {
              "name": tempName,
              "iconPath": res.savedFilePath,
              "url": tempUrl
            }
          })
          console.log(this.data.classify)
          this.addNewClassify(this.data.classify)
          this.updateAccountClassifyData(this.data.accountClassify)
        }
      })
    }
  },

  checkAccountClassifyName: function (e) {
    this.setData({
      tempName: e.detail.value
    })
  },

  /**
   * 新增一个分类
   */
  addNewClassify: function (classify) {
    var accountClassify = this.data.accountClassify
    accountClassify.push(classify)
    this.setData({
      accountClassify: accountClassify
    })
  },

  /**
   * 更新上一页面的分类信息 & 缓存数据
   */
  updateAccountClassifyData: function (accountClassify) {
    var pages = getCurrentPages()
    var that = pages[pages.length - 2]
    if (that.__route__ == "pages/main/main") {
      that.setData({
        accountClassify: accountClassify
      })
    }
    wx.setStorage({
      key: 'accountClassify',
      data: accountClassify,
      success: res => {
        wx.showToast({
          title: '添加成功',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const accountClassify = app.globalData.accountClassify
    this.setData({
      accountClassify: accountClassify,      
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
})