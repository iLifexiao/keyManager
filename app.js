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

    // 获取加密信息
    var secret = wx.getStorageSync('secret')
    if (secret.key.length != 16) {
      console.log("设置默认密钥")
      const defaultSecrst = {
        "key": "1234123412341234",
        "iv": "1111111111111111"
      }
      wx.setStorageSync("secret", defaultSecrst)
      this.globalData.secret = defaultSecrst
    } else {
      console.log(secret)
      this.globalData.secret = secret
    }
  },
  globalData: {
    userKey: [],
    secret: {}
  }
})