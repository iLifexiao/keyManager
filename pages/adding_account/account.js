const util = require('../../utils/util.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageType: "随机", // 用于展示不同的页面，默认随机页面
    tapIndex: 0,
    accType: "",
    existIconPathList: [],// 用于判断分类的图片是否已经存在
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
   * 解决方法一
   * 复制一份当前的对象，如下：
   * var that=this;//把this对象复制到临时变量that
   * 
   * 在wx.request({})，有时候会需要获取页面初始化数据data的情况，
   * 如果使用，this.data来获取，调试页面会报undefiend。
   * 原因是，在javascript中，this代表着当前对象，会随着程序的执行过程中的上下文改变
   * 在wx.request({}); 方法的回调函数中，对象已经发生改变，所以已经不是wx.request({});方法对象了，data属性也不存在了。 
   *
   *  解决方法二
   * 将回调函数换一种声明方式
   * success: res=> {
   *   this.
   * }
   */

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
    });
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
      const randomPwd = this.creatRandomPwdWithRules(rules)
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
    for (var i = 0; i < this.data.account.pwdCount; ++i) {
      // 随机选择一个种类
      const kindIndex = Math.floor(Math.random() * rules.length)
      const kind = rules[kindIndex]
      const compoent = this.data.passwordCompoent[kind]
      // 随机种类中的随机元素
      const compoentIndex = Math.floor(Math.random() * compoent.length)
      var randomValue = compoent[compoentIndex]
      randomPwd += randomValue
    }
    return randomPwd
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
    if (this.data.buttonType == "更新帐号") {
      // 更新icon的类型
      this.isExistIcon()
    }

    switch (this.data.iconTypeList[this.data.iconTypeIndex]) {
      case '常用图标':
        const account = this.updateAccWithIconPath(this.data.tempIcon)
        this.saveNewAccount(account)
        break;
      case '从相册中选择':
        wx.saveFile({
          tempFilePath: this.data.tempIcon,
          success: res => {
            const account = this.updateAccWithIconPath(this.data.tempIcon)
            this.saveNewAccount(account)
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
    console.log(account)
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
  isExistIcon: function () {
    // 是否为自定义图片
    if (this.data.tempIcon.search("//store") != -1) {
      if (this.data.existIconPathList.indexOf(tempIcon) != -1) {
        this.setData({
          iconTypeIndex: 0
        })
      }
    }
  },

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
      util.handleCopyPwd(pwd + "/" + secPwd, "游戏拷贝成功", "还未填写密码")
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
   * 异步接口在写成工具类的时候，可能会还没获取到数据就返回了
   */
  getExistIconPathList: function () {
    var existFileList = []
    var existIconPathList = []
    wx.getSavedFileList({
      success: res => {
        existFileList = res.fileList
        // console.log(existFileList)
        existFileList.forEach(function (icon, index) {
          existIconPathList.push(icon.filePath)
        })
        // console.log('existIconPathList:', existIconPathList)
        this.setData({
          existIconPathList: existIconPathList,
        })
      }
    })
  },

  /**
   * 根据不同的页面状态，显示不同的页面
   */
  handlePageShowType: function (options, existClassify) {
    // 已有帐号点击显示, 获取帐号在数据缓存中的位置
    const accountJSON = options.accountJSON || ""
    if (accountJSON != "") {
      // 获取已经存在的icon文件地址 
      this.getExistIconPathList()
      const account = JSON.parse(accountJSON)
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
      return
    }

    // url字符串中不需要添加 引号
    const pageType = options.pageType || ""
    this.settingPageType(pageType)
  },

  /**
   * 设置页面显示状态
   */
  settingPageType: function(pageType) {
    if (pageType == "随机") {
      this.setData({
        pageType: "随机"
      }),
      wx.setNavigationBarTitle({
        title: "随机生成密码",
      })
      return
    }

    if (pageType == "已有") {
      this.setData({
        pageType: "已有"
      }),
      wx.setNavigationBarTitle({
        title: "添加已有帐号",
      })
      return
    }

    if (pageType == "") {
      console.log("页面状态错误...")
    }
  },

  // 处理从 showAccount 处的跳转
  jumpFromShowAccount: function (accType, classify) {
    const classifyIndex = classify.indexOf(accType)
    var account = this.data.account    
    account.kind = accType
    if (classifyIndex != -1) {
      this.setData({
        classifyIndex: classifyIndex,
        account: account        
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const existClassify = util.getExistClassify(app.globalData.accountClassify)    
    this.jumpFromShowAccount(options.accType, existClassify)
    this.setData({
      classify: existClassify,
    })
    this.handlePageShowType(options, existClassify)
  },

  /**
   * 用户分享
   */
  onShareAppMessage: function (res) {
    const account = util.replaceAll(JSON.stringify(this.data.account), '#', '-')  
    return {
      title: this.data.tempName + '（帐号分享）',
      path: '/pages/shareAccount/shareAccount?accountJSON=' + account,
      imageUrl: "/images/shareImage.png",
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})