const util = require('../../utils/util.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageType: "添加", // 用于展示不同的页面，默认添加帐号页面
    tapIndex: 0,
    accType: "",
    // existIconPathList: [],// 用于判断分类的图片是否已经存在
    buttonType: "保存帐号",
    accountIndex: 0,
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

    pwdRules: [
      { name: '0-9', value: '0', checked: true },
      { name: 'a-z', value: '1', checked: true },
      { name: 'A-Z', value: '2', checked: true },
      { name: '!@#', value: '3', checked: true }
    ],

    // 10*26*26*10 = 66760??
    // json转码中 & ? 等符号不能使用
    passwordCompoent: {
      '0-9': ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      'a-z': ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
      'A-Z': ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      '!@#': ['!', '#', '@', '$', '%', '^', '_', '*', ',', '.']
    }
  },

  /**
   * 选择帐号图标
   */
  selectIcon: function (e) {
    wx.showActionSheet({
      itemList: this.data.iconTypeList,
      itemColor: '#00ADB7',
      success: res => {
        if (!res.cancel) {
          this.handleSelectIcon(res.tapIndex)
        }
      }
    })
  },

  /**
   * 处理图片的选择 & 记录图片来源
   */
  handleSelectIcon: function (tapIndex) {
    this.setData({
      iconTypeIndex: tapIndex
    })
    switch (tapIndex) {
      case 0:
        this.chooseOrdinaryIcon();
        break;
      case 1:
        this.chooseIconWithAlbum();
        break;
      default:
        break;
    }
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
    })
  },

  chooseOrdinaryIcon: function (e) {
    wx.navigateTo({
      url: '../adding_chooseLogo/chooseLogo',
    })
  },

  /**
   * 选择帐号分类
   */
  selectClassify: function (e) {
    var account = this.data.account
    const classifyIndex = e.detail.value
    account.kind = this.data.classify[classifyIndex]
    this.setData({
      classifyIndex: classifyIndex,
      account: account
    })
  },
  /**
   * 选择密码位数
   */
  accountCountChange: function (e) {
    var account = this.data.account
    account.pwdCount = e.detail.value
    this.setData({
      account: account
    })
  },
  /**
   * 修改成成的密码规则
   */
  pwdRuleChange: function (e) {
    var pwdRules = this.data.pwdRules
    var values = e.detail.value
    for (var i = 0, lenI = pwdRules.length; i < lenI; ++i) {
      pwdRules[i].checked = false;

      for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
        if (pwdRules[i].value == values[j]) {
          pwdRules[i].checked = true;
          break;
        }
      }
    }
    this.setData({
      pwdRules: pwdRules
    });
  },
  /**
   * 随机生成的密码用户可以修改
   * 如果用户修改了密码的状态，同时也要修改密码长度
   */
  checkPwd: function (e) {
    var account = this.data.account
    const pwd = e.detail.value
    account.pwdCount = pwd.length
    account.pwd = pwd
    this.setData({
      account: account
    })
  },
  checkSecPwd: function (e) {
    var account = this.data.account
    const secPwd = e.detail.value
    account.secPwd = secPwd
    this.setData({
      account: account
    })
  },

  /**
   * 随机生成密码
   */
  creatPassword: function (e) {
    const rules = this.getPwdRules()
    // 必须有选择密码种类
    if (rules.length > 0) {
      const randomPwd = this.makeSureUsedAllPwdRules(rules)
      this.savePwdWithType(randomPwd, e.currentTarget.dataset.pwdType)
    } else {
      wx.showToast({
        title: '至少有一个规则',
        image: '/images/exclamatory-mark.png'
      })
    }
  },

  /**
   * 获得当前选择的规则种类
   */
  getPwdRules: function () {
    var rules = []
    var pwdRules = this.data.pwdRules
    for (var i = 0, lenI = pwdRules.length; i < lenI; ++i) {
      if (pwdRules[i].checked) {
        rules.push(pwdRules[i].name)
      }
    }
    return rules
  },

  /**
   * 根据密码规则，生成随机密码
   */
  creatRandomPwdWithRules: function (rules) {
    var randomPwd = ""
    var usedRules = []
    var result = {
      pwd: "",
      allUsed: false
    }
    for (var i = 0; i < this.data.account.pwdCount; ++i) {
      // 随机选择一个种类
      const kindIndex = Math.floor(Math.random() * rules.length)
      const kind = rules[kindIndex]

      // 记录使用过的种类，为后面保证使用了选中的所有的密码规则提供依据
      var isUsed = false
      usedRules.forEach(function (value, index) {
        if (kind == value) {
          isUsed = true
        }
      })
      if (!isUsed) {
        usedRules.push(kind)
      }

      const compoent = this.data.passwordCompoent[kind]
      // 随机种类中的随机元素
      const compoentIndex = Math.floor(Math.random() * compoent.length)
      var randomValue = compoent[compoentIndex]
      randomPwd += randomValue
    }
    result.pwd = randomPwd    
    if (usedRules.length == rules.length) {
      result.allUsed = true
    } 

    return result   
  },

  /**
   * 确保使用了所有的密码规则
   */
  makeSureUsedAllPwdRules: function (rules) {
    var result = {}
    do {
      result = this.creatRandomPwdWithRules(rules)
    } while(!result.allUsed)
    
    return result.pwd
  },

  /**
   * 根据密码种类保存密码
   */
  savePwdWithType: function (pwd, pwdType) {
    var account = this.data.account
    switch (pwdType) {
      case "first":
        account.pwd = pwd
        break;
      case "second":
        account.secPwd = pwd
        break;
      default:
        console.log("密码种类错误...")
        break;
    }
    this.setData({
      account: account
    })
  },

  /**
   * 保存帐号
   */
  saveAccount: function (e) {
    // 输入信息判断
    if (util.isEmptyInput(this.data.tempName, "名称不能为空")) {
      return
    }
    if (util.isEmptyInput(this.data.account.acc, "帐号不能为空")) {
      return
    }
    if (util.isEmptyInput(this.data.account.pwd, "密码不能为空")) {
      return
    }

    // 特殊符号检查
    if (util.checkSpecialMark(this.data.account.name)) {
      return
    }
    if (util.checkSpecialMark(this.data.account.acc)) {
      return
    }
    if (util.checkSpecialMark(this.data.account.pwd)) {
      return
    }
    if (util.checkSpecialMark(this.data.account.secPwd)) {
      return
    }
    if (util.checkSpecialMark(this.data.account.remarks)) {
      return
    }

    // 判断页面状态    
    // if (this.data.buttonType == "更新帐号") {
    //   // 更新icon的类型
    //   this.isExistIcon()
    // }
        
    // 在选择同一张相册图片时，无法保存帐号，因为tempFile已经被移动到缓存中了，所以无法入法找到路径，导致执行wx.saveFile失败
    // 所以修改临时路径，为已经保存的图片，并执行第一步[常用图标] == 
    // 但是如果存在两个帐号同时使用一个文件，删除帐号会导致另一个帐号的图片失效
    // 所以需要在删除的时候判断是否该帐号是唯一使用该图片的帐号
    // 或者采用提示用户更新图片，为了更好的用户体验，使用第一种方法
    console.log(this.data.iconTypeIndex)
    switch (this.data.iconTypeList[this.data.iconTypeIndex]) {
      case '常用图标':
        const account = this.updateAccWithIconPath(this.data.tempIcon)
        this.saveNewAccount(account)
        break;
      case '从相册中选择':
        wx.saveFile({
          tempFilePath: this.data.tempIcon,
          success: res => {
            // BUG -> V.1.5.7:这里还是用的临时文件
            const account = this.updateAccWithIconPath(res.savedFilePath)
            this.saveNewAccount(account)
            this.setData({
              tempIcon: res.savedFilePath,
              iconTypeIndex: 0
            })
          }
        })
        break;
      default:
        console.log("图标选择类型错误")
        break;
    }
  },

  /**
   * 根据图片的不同信息，来更新帐号的图片路径
   */
  updateAccWithIconPath: function (path) {
    var account = this.data.account
    account.icon = path
    account.name = this.data.tempName
    this.setData({
      account: account
    })
    return account
  },

  /**
   * 更新完成后，保存更新
   */
  saveNewAccount: function (account) {
    if (this.data.buttonType == "更新帐号") {
      this.modifyAccount(account, this.data.accountIndex)
    } else {
      // 避免发生错误，添加相同的帐号时，需要判断一下
      const newAccountList = util.addAccount(account, app.globalData.accountList)
      if (newAccountList.length != 0) {
        app.globalData.accountList = newAccountList
        // 处理跳转来自帐号显示
        this.updataAddPage(account)
      }      
    }
    // console.log(account)
  },

  /**
   * 处理上一页面为帐号显示的添加帐号
   * 此时更新原来的帐号列表
   */
  updataAddPage: function (account) {
    var pages = getCurrentPages()
    var that = pages[pages.length - 2]
    if (that.__route__ == "pages/showAccount/showaccount") {
      if (that.data.accType == account.kind || that.data.accType == "全部") {
        var beforeAccountList = that.data.accountList
        beforeAccountList.push(account)
        that.setData({
          accountList: beforeAccountList,
        })
      }
    }
  },

  /**
   * 判断图片是否为缓存中 || icon列表中的图片
   * 是, 则设置图标为普通类型
   */
  // isExistIcon: function () {
  //   // 是否为自定义图片
  //   if (this.data.tempIcon.search("//store") != -1) {
  //     if (this.data.existIconPathList.indexOf(this.data.tempIcon) != -1) {
  //       this.setData({
  //         iconTypeIndex: 0
  //       })
  //     }
  //   }
  // },

  /**
   * 修改帐号信息
   */
  modifyAccount: function (account, index) {
    // 全局信息    
    app.globalData.accountList[index] = account
    this.updateBeforePageData(account)
    // 缓存信息
    wx.setStorage({
      key: 'account',
      data: app.globalData.accountList,
      success: res => {
        wx.showToast({
          title: '更新成功',
        })
      }
    })
  },

  /**
   * 更新上一页面的信息
   */
  updateBeforePageData: function (account) {
    var pages = getCurrentPages()
    var that = pages[pages.length - 2]
    var beforeAccountList = that.data.accountList
    // 这里通过判断是否更改了帐号的类型，来删除上一页面的帐号信息
    if (this.data.accType == account.kind || this.data.accType == "全部") {
      beforeAccountList[this.data.tapIndex] = account
    } else {
      beforeAccountList = util.deleteArrayInfo(beforeAccountList, this.data.tapIndex)
    }
    if (that.__route__ == "pages/showAccount/showaccount") {
      that.setData({
        accountList: beforeAccountList,
        emptyInfo: "暂无 " + this.data.accType + " 的帐号"
      })
    }
  },

  /**
   * 拷贝密码 
   */
  copyPwd: function (e) {
    const pwd = this.data.account.pwd
    const secPwd = this.data.account.secPwd

    if (this.data.classifyIndex == 1) {
      // 游戏帐号未必有二级密码，拷贝分情况
      if (secPwd.length == 0) {
        util.handleCopyPwd(pwd, "游戏拷贝成功", "还未填写密码")  
      } 
      else {
        util.handleCopyPwd(pwd + "/" + secPwd, "游戏拷贝成功", "还未填写密码")
      }    
    } else {
      util.handleCopyPwd(pwd, "密码拷贝成功", "还未填写密码")
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
  checkRemarks: function (e) {
    var account = this.data.account
    account.remarks = e.detail.value
    this.setData({
      account: account
    })
  },

  /**
   * 根据不同的页面状态，显示不同的页面
   */
  handlePageShowType: function (options, existClassify) {
    // 已有帐号点击显示, 获取帐号在数据缓存中的位置
    let pageType = options.pageType
    switch (pageType) {
      case "显示":
        this.showAccountInfo(options, existClassify)
        break;
      case "添加":
        this.settingPageType(pageType)
        // url字符串中不需要添加 引号
        this.updateOriginalAccountInfo(options.accType, existClassify)
        break;
      default:        
        break;
    } 
  },

  /**
   * 显示帐号
   */
  showAccountInfo: function (options, existClassify) {
    const account = JSON.parse(options.accountJSON)
    // 获取帐号的点击位置（上一页）和类型（未修改时）
    const classifyIndex = existClassify.indexOf(account.kind)
    this.setData({
      account: account,
      accType: options.accType,
      tapIndex: options.tapIndex,
      accountIndex: options.accountIndex,
      tempIcon: account.icon,
      tempName: account.name,
      classifyIndex: classifyIndex,      
      buttonType: "更新帐号"
    })
    wx.setNavigationBarTitle({
      title: account.name,
    })
  },

  /**
   * 设置页面显示状态，默认为添加状态
   */
  settingPageType: function(pageType) {
    if (pageType == "添加") {
      wx.setNavigationBarTitle({
        title: "添加帐号",
      })
      return
    }

    if (pageType == "") {
      console.log("页面状态错误...")
    }
  },

  // 处理从 showAccount 处的跳转
  updateOriginalAccountInfo: function (accType, classify) {
    // 判断跳转过来的分类
    const classifyIndex = classify.indexOf(accType)    
    if (classifyIndex != -1) {
      // 更改帐号的分类 & 图标
      var account = this.data.account   
      account.icon = this.accTypeToIcon(accType)
      account.kind = accType
      this.setData({
        classifyIndex: classifyIndex,
        account: account,
        tempIcon: this.accTypeToIcon(accType) 
      })
    }
  },

  // 根据showAccount的 type 显示分类图标
  accTypeToIcon: function (accType) {
    var returnImg = ""
    switch (accType) {
      case "社交":
        returnImg = "/images/talk_icon.png"
        break
      case "游戏":
        returnImg = "/images/game_icon.png"
        break
      case "学习":
        returnImg = "/images/study_icon.png"
        break
      case "金融":
        returnImg = "/images/money_icon.png"
        break
      case "论坛":
        returnImg = "/images/bbs_icon.png"
        break
      case "邮箱":
        returnImg = "/images/mail_icon.png"
        break
      case "其他":
        returnImg = "/images/others_icon.png"
        break
      default:
        returnImg = "/images/keyManager.png"
    }    
    return returnImg
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const existClassify = util.getExistClassify(app.globalData.accountClassify)
    // 获取已经存在的icon文件地址
    // 这个函数的目的在于节省本地文件保存数量，节省空间，但是比较的是临时文件，无法比较保存后的情况
    // this.getExistIconPathList()
    this.setData({
      classify: existClassify,
      pageType: options.pageType
    })
    this.handlePageShowType(options, existClassify)
  },

  /**
   * 用户分享
   */
  onShareAppMessage: function (res) {
    let account = util.replaceAll(JSON.stringify(this.data.account), '#', '-')
    return {
      title: this.data.tempName + '（帐号分享）',
      path: '/pages/shareAccount/shareAccount?accountJSON=' + account,
      imageUrl: "/images/shareImage.png",
    }
  }
})