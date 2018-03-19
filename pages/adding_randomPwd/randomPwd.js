var util = require('../../utils/util.js')
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
    passwordCompoent: {
      '0-9': ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
      'a-z': ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"],
      'A-Z': ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"],
      '!@#': ['!', '@', '#', '$', '%', '^', '&', '*', ',', '.']
    }
  },
  /**
   * 解决方法一
   * var that = this
   * 在wx.request({})，有时候会需要获取页面初始化数据data的情况，
   * 这个时候，如果使用，this.data来获取，会出现获取不到的情况，调试页面也会报undefiend。
   * 原因是，在javascript中，this代表着当前对象，会随着程序的执行过程中的上下文改变，
   * 在wx.request({});方法的回调函数中，对象已经发生改变，所以已经不是wx.request({});方法对象了，data属性也不存在了。
   * 官方的解决办法是，复制一份当前的对象，如下：
   * var that=this;//把this对象复制到临时变量that
   */

  /**
   * 解决方法二
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
          // 记录选择的图片来源
          this.setData({
            iconTypeIndex: res.tapIndex
          })
          switch (res.tapIndex) {
            case 0:
              this.chooseOrdinaryIcon();
              break;
            case 1:
              this.chooseIconWithAlbum();
              break;
            default:
              break;
          }
        }
      }
    })
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
   * 随机生成密码
   */
  creatPassword: function (e) {
    var tempPwd = ""
    const pwdRules = this.data.pwdRules
    // 判断当前选择的规则种类
    var rules = []
    for (var i = 0, lenI = pwdRules.length; i < lenI; ++i) {
      if (pwdRules[i].checked) {
        rules.push(pwdRules[i].name)
      }
    }

    // 必须有选择密码种类
    if (rules.length > 0) {
      const pwdCount = this.data.account.pwdCount
      const passwordCompoent = this.data.passwordCompoent
      for (var i = 0; i < pwdCount; ++i) {
        // 随机选择一个种类
        var kindIndex = Math.floor(Math.random() * rules.length)
        var kind = rules[kindIndex]
        var compoent = passwordCompoent[kind]

        // 随机种类中的随机元素
        var compoentIndex = Math.floor(Math.random() * compoent.length)
        var randomValue = compoent[compoentIndex]
        tempPwd += randomValue
      }

      // 判断当前密码的种类
      const pwdType = e.currentTarget.dataset.pwdType
      switch (pwdType) {
        case "first":
          var account = this.data.account
          account.pwd = tempPwd
          this.setData({
            account: account
          })
          break;
        case "second":
          var account = this.data.account
          account.secPwd = tempPwd
          this.setData({
            account: account
          })
          break;
        default:
          break;
      }
    }
  },
  /**
   * 保存帐号
   */
  saveAccount: function (e) {
    // 输入信息判断
    if (this.data.tempName.length == 0) {
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

    switch (this.data.iconTypeList[this.data.iconTypeIndex]) {
      case '常用图标':
        var account = this.data.account
        account.icon = this.data.tempIcon
        account.name = this.data.tempName
        this.setData({
          account: account
        })
        console.log(account)    
        util.updateAccount(account)
        break;
      case '从相册中选择':
        wx.saveFile({
          tempFilePath: this.data.tempIcon,
          success: res => {
            var account = this.data.account
            account.icon = res.savedFilePath
            account.name = this.data.tempName          
            this.setData({
              account: account
            })
            console.log(account)
            util.updateAccount(account)
          }
        })
        break;
      default:
        console.log("图标选择类型错误")
        break;
    }
  },

  /**
   * 拷贝密码
   */
  copyPwd: function (e) {
    const pwd = this.data.account.pwd
    const secPwd = this.data.account.secPwd

    if (this.data.classifyIndex == 1) {
      if (pwd.length != 0 || secPwd.length != 0) {
        wx.setClipboardData({
          data: pwd + "/" + secPwd,
          success: function (res) {
            wx.getClipboardData({
              success: function (res) {
                wx.showToast({
                  title: '游戏密码拷贝成功, 以 / 分隔',
                })
              }
            })
          }
        })
      } else {
        wx.showToast({
          title: '还未填写密码',
          image: '/images/exclamatory-mark.png'
        })
      }
      return
    }

    if (pwd.length != 0) {
      wx.setClipboardData({
        data: pwd,
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
    } else {
      wx.showToast({
        title: '还未填写密码',
        image: '/images/exclamatory-mark.png'
      })
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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const accountClassify = wx.getStorageSync('accountClassify')    
    const existClassify =  util.getExistClassify(accountClassify)
    this.setData({
      classify: existClassify
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