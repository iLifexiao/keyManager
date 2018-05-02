//获取应用实例
const app = getApp()

Page({
  /**
   * 页面的初始数据
   */
  data: {
    tishi: "输入密码",
    pwd: [],
    userKey: [],
    openFingerPrint: "0"
  },

  // 数字按钮  
  numTap: function (e) {
    const num = e.currentTarget.dataset.num
    var currentPwd = this.data.pwd
    // 记录密码
    currentPwd.push(num.toString())
    this.setData({
      pwd: currentPwd
    })
    this.handleOperation(this.data.tishi, currentPwd)
  },

  /**
   * 触发确认密码，根据标题来判断情况
   */  
  handleOperation: function (status, currentPwd) {
    if (status == "请设置密码") {
      this.settingPwd(currentPwd)
    } else if (status == "再输入一次") {
      this.confirmPwd(currentPwd)
    } else {
      this.loginPwd(currentPwd)
    }
  },

  settingPwd: function (currentPwd) {
    this.setData({
      userKey: currentPwd
    })
    if (this.isChangeStatus()) {
      this.setData({
        pwd: [],
        tishi: "再输入一次"
      })
    }          
  },

  /**
   * 完成一次密码输入，切换状态
   */
  isChangeStatus:function() {
    if (this.data.pwd.length == 6) {
      return true
    }
    return false          
  },

  confirmPwd: function (currentPwd) {
    if (this.isChangeStatus()) {
      // 验证密码成功
      if (this.data.userKey.toString() == currentPwd.toString()) {        
        this.setStorageAndLogin(currentPwd)
      } else {
        this.setData({
          pwd: [],
        })
        wx.vibrateLong({
        })
      }
    }
  },

  /**
   * 保存密码 & 自动登录
   */
  setStorageAndLogin: function (currentPwd) {
    // 记得修改全局变量，因为当前的数据都是依赖与全局变量
    app.globalData.userKey = currentPwd
    wx.setStorage({
      key: 'primary',
      data: currentPwd,
      success: res => {        
        wx.showToast({
          title: '设置成功',
        })
      }
    })    
    wx.switchTab({
      url: '../main/main',     
    })
  },

  loginPwd: function (currentPwd) {
    if (currentPwd.length == 6) {
      if (currentPwd.toString() == this.data.userKey.toString()) {
        wx.switchTab({
          url: '../main/main',
        })
      } else {
        this.setData({
          pwd: [],
          tishi: "密码错误"
        })
        wx.vibrateLong({
        })
      }
    }
  },

  // 清除按钮
  clearTap: function (e) {
    this.setData({
      pwd: [],
    })

    if (this.data.tishi == "请设置密码") {
      this.setData({
        userKey: []
      })
    }
  },

  // 删除按钮   
  deleteTap: function (e) {
    // 提取出公共部分
    const currentPwd = this.data.pwd
    currentPwd.pop()
    this.setData({
      pwd: currentPwd,
    })
    if (this.data.tishi == "请设置密码") {
      this.setData({
        userKey: currentPwd
      })
    }
  },

  // 重新设置按钮
  clearStoreKey: function (e) {
    this.setData({
      pwd: [],
      userKey: [],
      tishi: "请设置密码"
    })
  },

  // 开启指纹识别
  checkFingerPrint: function (e) {
    wx.startSoterAuthentication({
      requestAuthModes: ['fingerPrint'],
      challenge: '123456',
      authContent: '请用指纹解锁',
      success(res) {
        wx.switchTab({
          url: '../main/main',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 第一次使用软件,表示软件还未设置密码    
    if (app.globalData.userKey.length == 0) {
      this.setData({
        tishi: "请设置密码"
      })
    } else if (app.globalData.userKey.length == 6) {
      this.setData({
        userKey: app.globalData.userKey,
        openFingerPrint: app.globalData.openFingerPrint
      })
      // 自动弹出指纹验证
      if (app.globalData.openFingerPrint == "1") {
        this.checkFingerPrint()
      }
    }
  }
})