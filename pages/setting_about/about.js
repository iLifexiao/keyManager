const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    openSourceAddr: "https://github.com/iLifexiao/keyManager",
    mailAddr: "710178950@qq.com",
    unusedIconList: [],
    cacheSizeInfo: "0 KB"
  },

  showVersion: function(e) {
    wx.navigateTo({
      url: '../setting_showVersion/showVersion',
    })
  },

  copyGitHubAddr: function(e) {
    wx.setClipboardData({
      data: this.data.openSourceAddr,
      success: res=> {
        wx.showToast({
          title: '网址拷贝成功',
          image: '/images/GitHub.png'
        })
      }
    })
  },

  copyQQMailAddr: function (e) {
    wx.setClipboardData({
      data: this.data.mailAddr,
      success: res => {
        wx.showToast({
          title: '邮箱拷贝成功',
          image: '/images/QQMail.png'
        })
      }
    })
  },

  clearCache: function (e) {
    var unusedIconList = this.data.unusedIconList
    if (unusedIconList.length != 0) {
      unusedIconList.forEach(function (icon, index) {
        wx.removeSavedFile({
          filePath: icon,
          complete: function (res) {
            console.log(res)
          }
        })
      })
      wx.showToast({
        title: '清除成功',        
      })
      this.setData({
        unusedIconList: [],
        cacheSizeInfo: "0 KB"
      })
    }
    else {
      wx.showToast({
        title: '暂无缓存',
        image: '/images/exclamatory-mark.png'
      })
    }
        
  },

  /**
   * 获取帐号中未使用的图片路径缓存，排除自定义的壁纸
   */
  getUnusedIconInfo: function () {
    var unusedIconList = []
    var cacheSize = 0
    let usedIconList = this.getUsedIconList()
    
    wx.getSavedFileList({
      success: res => {
        res.fileList.forEach(function (icon, index) {
          // 返回-1表示未找到
          var iconIndex = usedIconList.indexOf(icon.filePath)         
          if (iconIndex == -1) {
            unusedIconList.push(icon.filePath)
            cacheSize += icon.size
          }
        })
        
        // 存在缓存
        if (cacheSize != 0) {
          // 调整数字的显示格式
          cacheSize = cacheSize / 1024
          var cacheSizeInfo = cacheSize.toString()
          let dotIndex = cacheSizeInfo.indexOf(".")
          cacheSizeInfo = cacheSizeInfo.slice(0, dotIndex)

          this.setData({
            unusedIconList: unusedIconList,
            cacheSizeInfo: cacheSizeInfo + " KB"
          })
        }                
      }
    })    
  },

  getUsedIconList: function() {
    // 获取帐号中所有的iconPath
    var usedIconList = []
    app.globalData.accountList.forEach(function (account, index) {
      usedIconList.push(account.icon)
    })
    // 分类的icon信息
    app.globalData.accountClassify.forEach(function (accountClass, index) {
      usedIconList.push(accountClass.iconPath)
    })
    // 背景图片
    usedIconList.push(app.globalData.bgImageUrl)
    return usedIconList
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getUnusedIconInfo()
  },
})