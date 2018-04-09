var fun_aes = require('../../utils/aes.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    userKey: "",
    checkKey: "",
    accountList: [],
    key: null,
    iv: null
  },
  
  checkUserKey: function (e) {
    this.setData({
      checkKey: e.detail.value
    })
  },

  exportAllAccount: function (e) {
    if (this.data.checkKey.length == 0) {
      wx.showToast({
        title: '请验证身份',
        image: '/images/exclamatory-mark.png'
      })
      return
    }
    const userKey = this.data.userKey
    const checkKey = this.data.checkKey

    // 确认密码
    if (checkKey == userKey) {
      const accountList = this.data.accountList      
      const remarks = this.Encrypt(JSON.stringify({"accountList": accountList}), this.data.key, this.data.iv)
      // console.log("remarks:", remarks)
      // 同时拷贝到剪切板
      wx.setClipboardData({
        data: remarks,
        success: function (res) {
          wx.getClipboardData({
            success: function (res) {
              wx.showToast({
                title: '导出信息已拷贝',
              })
            }
          })
        }
      })
      wx.addPhoneContact({
        firstName: '帐号管理(备份信息)',
        remark: remarks
      })
    }
    else {
      wx.showToast({
        title: '密码错误',
        image: "/images/error.png"
      })
    }
  },

  /**
 * AES 加密
 */
  Encrypt: function(word, key, iv) {
    var srcs = fun_aes.CryptoJS.enc.Utf8.parse(word);
    var encrypted = fun_aes.CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: fun_aes.CryptoJS.mode.CBC, padding: fun_aes.CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const userKeyArray = app.globalData.userKey
    const userKey = userKeyArray.join("")

    // 判断是否有可导出帐号
    const accountList = app.globalData.accountList
    if (accountList.length > 0) {
      this.setData({
        userKey: userKey,
        accountList: accountList
      })
    }

    //十六位十六进制数作为秘钥(非ECB模式)
    var key = fun_aes.CryptoJS.enc.Utf8.parse(app.globalData.secret.key);
    //十六位十六进制数作为秘钥偏移量(非ECB模式)
    var iv = fun_aes.CryptoJS.enc.Utf8.parse(app.globalData.secret.iv);
    this.setData({
      key: key,
      iv: iv
    })
  },

  // 9B5709974CE1F88186B40E7CA881B7C4

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  }
})