const util = require('../../utils/util.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    pageType: "",
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
      success: res => {
        wx.showToast({
          title: '删除成功',
        })
      }
    })
    // 更新全局变量
    app.globalData.accountList = newAccountList  
    this.updateAccountCount()  
  },

  /**
   * 搜索跳转
   */
  handleSearchList: function (accountListJson) {
    const accountDict = JSON.parse(accountListJson)
    const accountList = accountDict.value
    this.setData({
      accountList: accountList,
      pageType: "搜索"
    })
    wx.setNavigationBarTitle({
      title: "搜索结果(" + accountList.length + ')',
    })
  },
  
  /**
   * 正常跳转
   */
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
  },

  // 更新导航栏上显示的帐号数量
  updateAccountCount: function() {
    wx.setNavigationBarTitle({
      title: this.data.accType + '帐号(' + this.data.accountList.length + ')',
    })
  },

  // 右下角的浮动按钮
  jumpToAdd: function() {
    wx.navigateTo({
      url: '../adding_account/account?accType=' + this.data.accType + '&pageType=随机',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 判断跳转类型
    var pageType = options.type || ""
    if (pageType == "") {
      this.handleSearchList(options.accountListJson)
    } else {
      this.handleTypeList(pageType)
    }
  },

  onShow: function () {
    if (this.data.accType != "") {
      this.updateAccountCount()
    }    
  }
})