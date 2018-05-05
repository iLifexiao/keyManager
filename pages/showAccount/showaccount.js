const util = require('../../utils/util.js')
const app = getApp()
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
    const accountIndex = util.getIndexInObjectArray(app.globalData.accountList, account)
    const tapIndex = util.getIndexInObjectArray(this.data.accountList, account)
    
    console.log("account:", account)

    // 传递type & 当前的点击位置信息，用来修改信息
    const url = '../adding_account/account?accountJSON=' + JSON.stringify(account) + '&accountIndex=' + accountIndex + '&accType=' + this.data.accType + '&tapIndex=' + tapIndex
    // console.log("url:",url)    
    wx.navigateTo({
      url: url,
    })
  },

  /**
   * 展示长按操作
   */
  showOperation: function (e) {
    // 记录当前点击的行（显示的数据）
    const account = e.currentTarget.dataset.account        
    this.setData({
      currentAccountIndex: util.getIndexInObjectArray(this.data.accountList, account)
    })

    // TODO: 添加分享操作
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
    this.setData({
      accountList: util.deleteArrayInfo(this.data.accountList, this.data.currentAccountIndex)
    })
    // 缓存信息
    const accountIndex = util.getIndexInObjectArray(app.globalData.accountList, account)
    const newAccountList = util.deleteArrayInfo(app.globalData.accountList, accountIndex)
    wx.setStorage({
      key: 'account',
      data: newAccountList,
      success: res=> {
        wx.showToast({
          title: '删除成功',
        })
      }
    })
    // 更新全局变量
    app.globalData.accountList = newAccountList 
  },

  handleSearchList: function (accountListJson) {
    wx.setNavigationBarTitle({
      title: "搜索结果",
    })
    const accountDict = JSON.parse(accountListJson)
    const accountList = accountDict.value
    this.setData({
      accountList: accountList
    })
  },

  handleTypeList: function (tempType) {
    const accountList = util.getAccountWith(tempType, app.globalData.accountList)
    if (accountList.length == 0) {
      this.setData({
        accType: tempType,
        emptyInfo: "暂无 " + tempType + " 的帐号"
      })
    } else {
      this.setData({
        accType: tempType,
        accountList: accountList
      })
    }
    wx.setNavigationBarTitle({
      title: tempType + '帐号',
    })  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断跳转类型
    var tempType = options.type || ""    
    if (tempType == "") {
      this.handleSearchList(options.accountListJson)
    } else {
      this.handleTypeList(tempType)
    }
  },
})