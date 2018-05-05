const util = require('../../utils/util.js')
const app = getApp()
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
    }
  },
  

  // 输入框失去焦点的响应事件
  checkAccountName: function (e) {
    var account = this.data.account
    account.name = e.detail.value
    this.updataAccount(account)
  },
  checkAccount: function (e) {
    var account = this.data.account
    account.acc = e.detail.value
    this.updataAccount(account)
  },
  checkPwd: function (e) {
    var account = this.data.account
    const pwd = e.detail.value
    account.pwd = pwd
    this.updataAccount(account)
  },
  checkSecPwd: function (e) {
    var account = this.data.account    
    account.secPwd = e.detail.value
    this.updataAccount(account)
  },
  checkRemarks: function (e) {
    var account = this.data.account
    account.remarks = e.detail.value
    this.updataAccount(account)
  },

  // 更新帐号
  updataAccount: function (account) {
    this.setData({
      account: account
    })
  },

  saveAccount: function (e) {
    // 输入信息判断
    if (util.isEmptyInput(this.data.account.name, "名称不能为空")) {
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
    var accountList = wx.getStorageSync('account') || []
    const newAccountList = util.addAccount(this.data.account, accountList)
    if (newAccountList.length != 0) {
      app.globalData.accountList = newAccountList
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var accountJSON = options.accountJSON || ""    
    if (accountJSON != "") {
      accountJSON = util.replaceAll(accountJSON, "-", "#")
      console.log(accountJSON)
      const account = JSON.parse(accountJSON)      
      this.setData({
        account: account,
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }    
    const account = util.replaceAll(JSON.stringify(this.data.account), '#', '-')
    console.log(account)
    return {
      title: this.data.account.name + '(帐号分享)',
      path: '/pages/shareAccount/shareAccount?accountJSON=' + account,
      imageUrl: this.data.account.icon,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})