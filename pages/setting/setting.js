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
        "title": "清空帐号",
        "detail": "",
        "url": "/pages/setting_clearAllPwd/clearAllPwd"
      },
      {
        "iconPath": "/images/reset.png",
        "title": "重置软件",
        "detail": "",
        "url": "/pages/setting_resetSoft/resetSoft"
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
      },
      {
        "iconPath": "/images/fingerprint.png",
        "title": "设置指纹识别",
        "detail": "",
        "url": "/pages/setting_fingerPrint/fingerPrint"
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
})