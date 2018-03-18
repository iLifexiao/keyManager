Page({

  /**
   * 页面的初始数据
   */
  data: {
    pwdManagerList: [
      {
        "iconPath": "/images/export.png",
        "title": "导出帐号",
        "detail": "",
        "url": "/pages/setting_exportPwd/exportPwd"
      },
      {
        "iconPath": "/images/import.png",
        "title": "导入帐号",
        "detail": "",
        "url": "/pages/setting_importPwd/importPwd"
      },
      {
        "iconPath": "/images/clear.png",
        "title": "清空密码",
        "detail": "",
        "url": "/pages/setting_clearAllPwd/clearAllPwd"
      }
    ],
    encodeSettingList: [
      {
        "iconPath": "/images/edit.png",
        "title": "修改密码规则",
        "detail": "",
        "url": "/pages/setting_editPwdRules/editPwdRules"
      },
      {
        "iconPath": "/images/password.png",
        "title": "修改登录密码",
        "detail": "",
        "url": "/pages/setting_modifyUserKey/modifyUserKey"
      }
    ],
    softSettingList: [
      {
        "iconPath": "/images/help.png",
        "title": "使用帮助",
        "detail": "",
        "url": "/pages/setting_help/help"
      },
      {
        "iconPath": "/images/about.png",
        "title": "关于软件",
        "detail": "",
        "url": "/pages/setting_about/about"
      },
      {
        "iconPath": "/images/advices.png",
        "title": "我要吐槽",
        "detail": "",
        "url": "/pages/setting_advices/advices"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})