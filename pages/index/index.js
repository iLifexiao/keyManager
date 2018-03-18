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
    confirmKey: []
  },
  /**
   * 数字按钮
   */
  numTap: function(e) {
    const num = e.currentTarget.dataset.num
    const currentPwd = this.data.pwd
    // 记录密码
    currentPwd.push(num.toString())
    this.setData({
      pwd: currentPwd
    })

    // 判断是否第一次使用软件
    const tishi = this.data.tishi
    if (tishi == "请设置密码") {    
      this.setData({
        userKey: currentPwd
      })
    }

    // 触发确认密码，根据标题来判断情况
    if (this.data.userKey.length == 6 && tishi == "请设置密码") {
      this.setData({
        pwd: [],
        tishi: "在输入一次"
      })
    } else if (this.data.userKey.length == 6 && tishi == "在输入一次"){
      this.setData({
        confirmKey: currentPwd,
      }) 
    }
    
    // 自动登录 和 设置密码
    if (currentPwd.length == 6 && this.data.userKey.toString() == this.data.confirmKey.toString()) {
      if (currentPwd.toString() == this.data.confirmKey.toString() && tishi == "在输入一次") {
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
      } else if (currentPwd.toString() == this.data.confirmKey.toString()) {
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
    } else if (this.data.userKey.length == 6 && this.data.confirmKey.length == 6 && this.data.userKey.toString() != this.data.confirmKey.toString()) {
      this.setData({
        pwd: [],
        confirmKey: []
      })
      wx.vibrateLong({
      })
    }
  },

  clearStoreKey: function(e) {
    this.setData({
      pwd: [],
      userKey: [],
      confirmKey: [],
      tishi: "请设置密码"
    })
  },

  resetLoginPwd: function(e) {
    wx.setStorage({
      key: 'primary',
      data: ["6", "6", "6", "6", "6", "6"],
      success: res => {
        wx.showToast({
          title: '重置成功',
        })
      }
    })
  },
  /**
   * 清除按钮
   */
  clearTap: function (e) {
    const tishi = this.data.tishi
    if (tishi == "请设置密码") {
      this.setData({
        pwd: [],
        userKey: []
      })
    } else if (tishi == "在输入一次") {
      this.setData({
        pwd: [],
        confirmKey: []
      })
    } else {
      this.setData({
        pwd: []
      })
    }
  },
  /**
   * 删除按钮 
   */
  deleteTap: function (e) {
    const tishi = this.data.tishi
    if (tishi == "请设置密码") {
      const currentPwd = this.data.pwd
      const userKey = this.data.userKey
      currentPwd.pop()
      userKey.pop()
      this.setData({
        pwd: currentPwd,
        userKey:userKey
      })
    } else if (tishi == "在输入一次") {
      const currentPwd = this.data.pwd
      const confirmKey = this.data.confirmKey
      currentPwd.pop()
      confirmKey.pop()
      this.setData({
        pwd: currentPwd,
        confirmKey: confirmKey        
      })
    } else {
      const currentPwd = this.data.pwd
      currentPwd.pop()
      this.setData({
        pwd: currentPwd
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 第一次使用软件
    if (app.globalData.userKey.length == 0) {
      this.setData({
        tishi: "请设置密码"
      })
    } else if (app.globalData.userKey.length == 6){
      this.setData({
        userKey: app.globalData.userKey,
        confirmKey: app.globalData.userKey
      })
    }else{
      console.log(app.globalData.userKey)
    }
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