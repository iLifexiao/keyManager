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
      name: "帐号",
      acc: "1234567890",
      pwd: "12345678",
      secPwd: "",
      pwdCount: 8,
      remarks: "",
    },
    tempAccount: {
      remarks: "发生错误了...",
      name: ""
    },

    accountIndex: 0,
    accType: "社交",
    tapIndex: 0,
    pageType: "显示"
  },

  editacc: function(e) {
    const url = '../adding_account/account?accountJSON=' + JSON.stringify(this.data.account) + '&accountIndex=' + this.data.accountIndex + '&accType=' + this.data.accType + '&tapIndex=' + this.data.tapIndex + '&pageType=' + this.data.pageType
    // console.log("url:",url)
    wx.navigateTo({
      url: url,
    })
  },

  copyIcon: function(e) {
    const icon = this.data.account.icon
    util.handleCopyPwd(icon, "图标复制成功", "暂无图标...")
  },

  copyRemarks: function(e) {
    const remarks = this.data.account.remarks
    util.handleCopyPwd(remarks, "备注拷贝成功", "暂无备注...")
  },

  copyAcc: function(e) {
    const acc = this.data.account.acc
    util.handleCopyPwd(acc, "帐号拷贝成功", "还未填写帐号")
  },

  copyPwd: function(e) {
    const pwd = this.data.account.pwd
    const secPwd = this.data.account.secPwd

    if (this.data.accType === '游戏') {
      // 游戏帐号未必有二级密码，拷贝分情况
      if (secPwd.length == 0) {
        util.handleCopyPwd(pwd, "游戏拷贝成功", "还未填写密码")
      } else {
        util.handleCopyPwd(pwd + "/" + secPwd, "游戏拷贝成功", "还未填写密码")
      }
    } else {
      util.handleCopyPwd(pwd, "密码拷贝成功", "还未填写密码")
    }
  },

  // 因为在两个页面之间添加了新的页面，需要将以下数据做一个中转
  // accountJSON、accountIndex、accType、tapIndex、pageType
  showAccountInfo: function(options) {

    const account = JSON.parse(options.accountJSON)
    const tempAccount = util.handleAccountLength(account)

    this.setData({
      accountIndex: options.accountIndex,
      accType: options.accType,
      tapIndex: options.tapIndex,
      pageType: options.pageType,

      account: account,
      tempAccount: tempAccount
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.showAccountInfo(options)
  },

  onShow: function(options) {
    wx.setNavigationBarTitle({
      title: this.data.account.name,
    })
  },

  /**
   * 用户分享
   */
  onShareAppMessage: function(res) {
    let account = util.replaceAll(JSON.stringify(this.data.account), '#', '-')
    return {
      title: this.data.account.name + '（帐号分享）',
      path: '/pages/shareAccount/shareAccount?accountJSON=' + account,
      imageUrl: "/images/shareImage.png",
    }
  }
})