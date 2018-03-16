//app.js
App({
  onLaunch: function () {

    // 获取用户的primaryKEY
    var key = wx.getStorageSync('primary')
    if (key.length == 0) {
      console.log("第一次使用")      
    }else{
      console.log(key)
      this.globalData.userKey = key
    }    
  },
  globalData: {
    userKey: []
  }
})