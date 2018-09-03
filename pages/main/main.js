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
    if (util.isEmptyInput(accountList, '没有该类帐号')) { 
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

  // 自定义背景图片功能（互斥的）
  // 在清除缓存的时候，同时需要考虑背景图片的情况
  changeBGAction: function (e) {
    wx.showActionSheet({
      itemList: ["每日壁纸", "从相册选择"],
      itemColor: '#00ADB7',
      success: res => {
        if (!res.cancel) {
          switch (res.tapIndex) {
            case 0:
              this.randomBGButton()
              break;
            case 1:
              this.diyBGImage();
              break;
            default:
              break;
          }
        }
      }
    })
  },

  diyBGImage: function() {
    wx.chooseImage({
      count: 1,
      success: res => {
        let tempFilePaths = res.tempFilePaths[0]
        wx.saveFile({
          tempFilePath: tempFilePaths,
          success: res => {
            // 当前壁纸
            this.setData({
              imageURL: res.savedFilePath
            })
            // 和随机壁纸的状态是互斥的
            this.updateImageStatue('0', '更换成功')
            // 删除之前的背景图片
            if (app.globalData.bgImageUrl.search("//store") != -1) {
              wx.removeSavedFile({
                filePath: app.globalData.bgImageUrl,
                success: res => {
                  console.log("删除之前的壁纸成功")                  
                }
              })              
            }
            // 缓存
            wx.setStorage({
              key: 'bgImageUrl',
              data: res.savedFilePath,
            })
            // 全局变量
            app.globalData.bgImageUrl = res.savedFilePath
          }
        })        
      },
    });
  },
  
  /**
   * 开启随机壁纸
   */
  randomBGButton: function() {
    var isOpenRandomImg = this.data.isOpenRandomImg
    if (isOpenRandomImg == '1') {      
      this.updateImageStatue('0', '关闭每日壁纸')
      this.setData({
        imageURL: app.globalData.bgImageUrl
      })
    } else {      
      this.updateImageStatue('1', '开启每日壁纸')
      this.setData({
        imageURL: "https://picsum.photos/375/200/?random"
      })
      
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
    } else {
      this.setData({
        imageURL: app.globalData.bgImageUrl
      })
    }
    this.setData({
      accountClassify: app.globalData.accountClassify,
      isOpenRandomImg: isOpenRandomImg,      
    })
  }
})
