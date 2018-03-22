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

    // 获取加密信息, 虽然是一个字典，但是数据是空的，自然旧获取不到key
    var secret = wx.getStorageSync('secret') || {
      "key": "",
      "iv": ""
      }

    if (secret.key.length != 16 || secret.iv.length != 16) {
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

    // 获取用户的添加帐号
    var accountList = wx.getStorageSync('account') || []
    if (accountList.length == 0) {
      console.log("用户还未添加帐号")
    } else {
      this.globalData.accountList = accountList
      console.log(accountList)
    }

    // 获取用户的帐号分类, 避免发生获取失败的问题
    var accountClassify = wx.getStorageSync('accountClassify') || []
    if (accountClassify.length == 0) {      
      accountClassify = [
        {
          "name": "全部",
          "iconPath": "/images/all.png",
          "url": "../showAccount/showaccount?type=全部"
        },
        {
          "name": "社交",
          "iconPath": "/images/talk.png",
          "url": "../showAccount/showaccount?type=社交"
        },
        {
          "name": "游戏",
          "iconPath": "/images/game.png",
          "url": "../showAccount/showaccount?type=游戏"
        },
        {
          "name": "学习",
          "iconPath": "/images/study.png",
          "url": "../showAccount/showaccount?type=学习"
        },
        {
          "name": "金融",
          "iconPath": "/images/money.png",
          "url": "../showAccount/showaccount?type=金融"
        },
        {
          "name": "论坛",
          "iconPath": "/images/bbs.png",
          "url": "../showAccount/showaccount?type=论坛"
        },
        {
          "name": "邮箱",
          "iconPath": "/images/mail.png",
          "url": "../showAccount/showaccount?type=邮箱"
        },
        {
          "name": "其他",
          "iconPath": "/images/others.png",
          "url": "../showAccount/showaccount?type=其他"
        },
        {
          "name": "管理",
          "iconPath": "/images/addClass.png",
          "url": "../setting_accountClassify/accountClassify"
        }
      ],
      wx.setStorageSync("accountClassify", accountClassify)
      this.globalData.accountClassify = accountClassify
      console.log(accountClassify)
    } else {
      this.globalData.accountClassify = accountClassify
      console.log(accountClassify)
    }
  },

  globalData: {
    userKey: [],
    secret: {},
    accountClassify: [],
    accountList: []
  }
})