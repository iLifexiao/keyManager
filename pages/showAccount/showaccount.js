var util = require('../../utils/util.js')
Page({
  /**
   * 页面的初始数据
   */
  data: {
    accType: "",
    accountList: [],
    emptyInfo: "",
    currentAccountIndex: 0
  },

  /**
   * 显示详细的帐号信息
   */
  showDetail: function (e) {
    const account = e.currentTarget.dataset.account
    // 数组对象的比较还包括了指针, 所以即使内容完全一样，也无法查找到
    const allAccountList = wx.getStorageSync('account')
    const accountIndex = util.getIndexInObjectArray(allAccountList, account)
    wx.navigateTo({
      url: '../adding_randomPwd/randomPwd?accountJSON=' + JSON.stringify(account) + '&accountIndex=' + accountIndex,
    })
  },

  /**
   * 展示长按操作
   */
  showOperation: function (e) {
    // 记录当前点击的行（显示的数据）
    const account = e.currentTarget.dataset.account    
    const currentAccountIndex = util.getIndexInObjectArray(this.data.accountList, account)
    console.log(currentAccountIndex)
    this.setData({
      currentAccountIndex: currentAccountIndex
    })
    wx.showActionSheet({
      itemList: ["删除"],
      itemColor: '#00ADB7',
      success: res => {
        if (!res.cancel) {
          switch (res.tapIndex) {
            case 0:              
              this.deleteAccount(account);
              break;
            default:
              break;
          }
        }
      }
    })
  },

  // Source下方可以使用断点调试
  deleteAccount: function (account) { 
    // 当前信息   
    const accountList = this.data.accountList
    const currentAccountIndex = this.data.currentAccountIndex
    const newArray = util.deleteArrayInfo(accountList, currentAccountIndex)
    this.setData({
      accountList: newArray
    })

    // 缓存信息
    const allAccountList = wx.getStorageSync('account')    
    const accountIndex = util.getIndexInObjectArray(allAccountList,account)
    console.log('accountIndex',accountIndex)
    wx.setStorage({
      key: 'account',
      data: util.deleteArrayInfo(allAccountList, accountIndex),
      success: res=> {
        wx.showToast({
          title: '删除成功',
        })
      }
    })    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断跳转类型
    var tempType = options.type || ""
    if (tempType == "") {
      wx.setNavigationBarTitle({
        title: "搜索结果",
      })
      const accountDict = JSON.parse(options.accountListJson)
      const accountList = accountDict.value
      this.setData({
        accountList: accountList
      })
    } else {
      wx.setNavigationBarTitle({
        title: tempType + '帐号',
      })
      const accountList = util.getAccountWith(tempType)
      this.setData({
        accType: tempType,
        accountList: accountList
      })
      if (accountList.length == 0) {
        this.setData({
          emptyInfo: "暂无 " + tempType + " 的帐号"
        })
      }
    }
  },
})