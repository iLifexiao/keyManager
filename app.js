//app.js
App({
  onLaunch: function () {
    // 获取用户的primaryKEY
    var key = wx.getStorageSync('primary') || []
    if (key.length != 0) {
      this.globalData.userKey = key     
    }

    // 获取加密信息, 虽然是一个字典，但是数据是空的，自然旧获取不到key
    var secret = wx.getStorageSync('secret') || {
      "key": "",
      "iv": ""
      }

    if (secret.key.length != 16 || secret.iv.length != 16) {
      // console.log("设置默认密钥")
      const defaultSecrst = {
        "key": "1234123412341234",
        "iv": "1111111111111111"
      }
      wx.setStorageSync("secret", defaultSecrst)
      this.globalData.secret = defaultSecrst
    } else {
      // console.log(secret)
      this.globalData.secret = secret
    }

    // 获取用户的添加帐号
    var accountList = wx.getStorageSync('account') || []
    if (accountList.length != 0) {
      this.globalData.accountList = accountList
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
    } else {
      this.globalData.accountClassify = accountClassify      
    }

    // 检测是否支持指纹识别
    wx.checkIsSupportSoterAuthentication({
      success: res => {
        let supportMode = res.supportMode
        if (supportMode.length != 0) {
          var isSupport = false
          // forEach里不能使用 this
          // 同之前的一样
          supportMode.forEach(function (mode, index) {
            if (mode == "fingerPrint") {
              isSupport = true              
            }
          })
          if (isSupport) {
            this.globalData.supportFinger = "1"
            console.log("支持指纹识别")
          }       
        }
        else {
          console.log("不支持指纹识别")
        }
      },
    })

    // 判断是否开启了指纹验证
    var openFingerPrint = wx.getStorageSync('openFingerPrint') || '0'
    this.globalData.openFingerPrint = openFingerPrint

    // 开启随机壁纸
    var isOpenRandomImg = wx.getStorageSync("randomImg") || '0'
    this.globalData.isOpenRandomImg = isOpenRandomImg
    
},

  globalData: {
    userKey: [],
    secret: {},
    accountClassify: [],
    accountList: [],
    supportFinger: '0',
    openFingerPrint: '0',
    isOpenRandomImg: '0'
  }
})
