var fun_aes = require('../../utils/aes.js')
var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    backInfo: "",
    key: null,
    iv: null
  },

  getBackInfo: function (e) {
    this.setData({
      backInfo: e.detail.value
    })
  },

  importAccount: function (e) {
    const backInfo = this.data.backInfo
    if (backInfo.length == 0) {
      wx.showToast({
        title: '输入内容不能为空',
        image: '/images/exclamatory-mark.png'
      })
      return
    }
    const accountInfo = this.Decrypt(backInfo, this.data.key, this.data.iv)
    if (accountInfo.length == 0) {
      wx.showToast({
        title: '密文有误',
        image: '/images/error.png'
      })
      return
    }
    const accountDict = JSON.parse(accountInfo)    
    const backAccountList = accountDict.accountList
    wx.setStorage({
      key: 'account',
      data: backAccountList,
      success: res=> {
        wx.showToast({
          title: '导入成功',
        })
      }
    })
    app.globalData.accountList = backAccountList
  },

 /**
  * AES 解密
  */
  Decrypt: function(word, key, iv) {
    var encryptedHexStr = fun_aes.CryptoJS.enc.Hex.parse(word);
    var srcs = fun_aes.CryptoJS.enc.Base64.stringify(encryptedHexStr);
    var decrypt = fun_aes.CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: fun_aes.CryptoJS.mode.CBC, padding: fun_aes.CryptoJS.pad.Pkcs7 });
    var decryptedStr = decrypt.toString(fun_aes.CryptoJS.enc.Utf8);
    return decryptedStr.toString();
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //十六位十六进制数作为秘钥(非ECB模式)
    var key = fun_aes.CryptoJS.enc.Utf8.parse(app.globalData.secret.key);
    //十六位十六进制数作为秘钥偏移量(非ECB模式)
    var iv = fun_aes.CryptoJS.enc.Utf8.parse(app.globalData.secret.iv);
    this.setData({
      key: key,
      iv: iv
    })
  },

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