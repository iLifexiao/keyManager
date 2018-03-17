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
      pwdCount: 6,
      remarks: "",
    },
    
    classify: ["社交", "游戏", "论坛", "学习", "金融"],
    classifyIndex: 0,

    pwdRules: [
      { name: '0-9', value: '0', checked: true },
      { name: 'a-z', value: '1', checked: true },
      { name: 'A-Z', value: '2', checked: true },
      { name: '!@#', value: '3', checked: true }
    ],

    // 10*26*26*10 = 66760??
    passwordCompoent: {
      '0-9': ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      'a-z': ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
      'A-Z': ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      '!@#': ['!', '@', '#', '$', '%', '^', '&', '*', ',', '.']
    }
  },

  /**
   * 选择帐号图标
   */
  selectIcon: function (e) {
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        wx.saveFile({
          tempFilePath: tempFilePaths[0],
          success: function (res) {            
            var savedFilePath = res.savedFilePath
            console.log(savedFilePath)
            
          }
        })
      }
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
  accountCountChange: function(e) {
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
   * 随机生成密码
   */
  creatPassword: function (e) {
    var tempPwd = ""
    const pwdRules = this.data.pwdRules
    // 判断当前选择的规则种类
    var rules = []
    for (var i = 0, lenI = pwdRules.length; i < lenI; ++i ) {
      if (pwdRules[i].checked) {
        rules.push(pwdRules[i].name)
      }
    }
    
    // 必须有选择密码种类
    if (rules.length > 0) {
      const pwdCount = this.data.account.pwdCount
      const passwordCompoent = this.data.passwordCompoent
      for(var i = 0; i < pwdCount; ++i) {
        // 随机选择一个种类
        var kindIndex = Math.floor(Math.random() * rules.length)
        var kind = rules[kindIndex]
        var compoent = passwordCompoent[kind]
        
        // 随机种类中的随机元素
        var compoentIndex = Math.floor(Math.random() * compoent.length)
        var randomValue = compoent[compoentIndex]
        tempPwd += randomValue
      }

      var account = this.data.account
      account.pwd = tempPwd
      this.setData({
        account: account
      })
    }
  },
  /**
   * 保存帐号
   */
  saveAccount: function (e) {
    // 输入信息判断
    if (this.data.account.name.length == 0) {
      wx.showToast({
        title: '帐号名称不能为空',
        image: '/images/exclamatory-mark.png'
      })
      return
    }
    if (this.data.account.acc.length == 0) {
      wx.showToast({
        title: '帐号不能为空',
        image: '/images/exclamatory-mark.png'
      })
      return
    }
    if (this.data.account.pwd.length == 0) {
      wx.showToast({
        title: '密码不能为空',
        image: '/images/exclamatory-mark.png'
      })
      return
    }

    console.log(this.data.account)
  },
  /**
   * 拷贝密码
   */
  copyPwd: function (e) {
    wx.setClipboardData({
      data: this.data.account.pwd,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '密码拷贝成功',
            })
          }
        })
      }
    })
  },
  
  // 输入框失去焦点的响应事件
  checkAccountName: function (e) {
    var account = this.data.account
    account.name = e.detail.value
    this.setData({
      account: account
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})