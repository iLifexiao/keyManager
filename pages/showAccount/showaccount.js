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
    emptyInfo: "加载中...",
    currentAccountIndex: 0
  },

  /**
   * 显示详细的帐号信息
   */
  showDetail: function(e) {
    const account = e.currentTarget.dataset.account
    // 数组对象的比较还包括了指针, 所以即使内容完全一样，也无法查找到
    const accountIndex = util.getIndexInObjectArray(app.globalData.accountList, account)
    const tapIndex = util.getIndexInObjectArray(this.data.accountList, account)

    // console.log("account:", account)

    // 传递type & 当前的点击位置信息，用来修改信息
    // const url = '../adding_account/account?accountJSON=' + JSON.stringify(account) + '&accountIndex=' + accountIndex + '&accType=' + this.data.accType + '&tapIndex=' + tapIndex + '&pageType=显示'
    // console.log("url:",url)   

    const url2 = '../adding_showAcc/showAcc?accountJSON=' + JSON.stringify(account) + '&accountIndex=' + accountIndex + '&accType=' + this.data.accType + '&tapIndex=' + tapIndex + '&pageType=显示'
    wx.navigateTo({
      url: url2,
    })
  },

  /**
   * 展示长按操作
   */
  showOperation: function(e) {
    // 记录当前点击的行（显示的数据）
    const account = e.currentTarget.dataset.account
    this.setData({
      currentAccountIndex: util.getIndexInObjectArray(this.data.accountList, account)
    })

    wx.showActionSheet({
      itemList: ["复制密码", "复制图标", "删除"],
      itemColor: '#00ADB7',
      success: res => {
        if (!res.cancel) {
          switch (res.tapIndex) {
            case 0:
              this.copyPwd(account)
              break
            case 1:
              this.copyIcon(account)
              break
            case 2:
              this.showHandelTips(account)
              break
            default:
              break
          }
        }
      }
    })
  },

  showHandelTips: function(account) {
    wx.showModal({
      title: '温馨提示',
      content: '确定删除吗?',
      cancelColor: '#00ADB7',
      confirmColor: '#000000',
      success: res => {
        if (res.confirm) {
          this.deleteAccount(account)
        }
      }
    })
  },

  copyIcon: function(account) {
    const icon = account.icon
    util.handleCopyPwd(icon, "图标复制成功", "暂无图标...")
  },

  copyPwd: function(account) {
    const pwd = account.pwd
    const secPwd = account.secPwd

    if (this.data.accType === '游戏') {
      // 游戏帐号未必有二级密码，拷贝分情况
      if (secPwd.length === 0) {
        util.handleCopyPwd(pwd, "游戏拷贝成功", "还未填写密码")
      } else {
        util.handleCopyPwd(pwd + "/" + secPwd, "游戏拷贝成功", "还未填写密码")
      }
    } else {
      util.handleCopyPwd(pwd, "密码拷贝成功", "还未填写密码")
    }
  },

  // Source下方可以使用断点调试
  deleteAccount: function(account) {
    // 删除保存的图片icon
    if (this.isSaveUniqueIcon(account.icon)) {
      wx.removeSavedFile({
        filePath: account.icon,
        success: res => {
          console.log("保存的图片删除成功")
        },
        fail: res => {
          console.log("保存的图片删除失败")
        }
      })
    }
    // 当前信息            
    this.setData({
      accountList: util.deleteArrayInfo(this.data.accountList, this.data.currentAccountIndex),
      emptyInfo: "这里好像什么都没有"
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

  // 判断是否为保存的图片icon
  isSaveUniqueIcon: function(iconPath) {
    // 是否为自定义图片
    if (iconPath.search("//store") !== -1) {
      // 是否只有一个帐号使用了该图片
      // 通过所有帐号的图标数量来判断        
      var sameIconCount = 0
      app.globalData.accountList.forEach(function(account, index) {
        if (account.icon === iconPath) {
          sameIconCount += 1
        }
      })
      // console.log(sameIconCount)
      if (sameIconCount > 1) {
        return false
      } else {
        return true
      }
    }
    return false
  },

  /**
   * 搜索跳转
   */
  handleSearchList: function(accountListJson) {
    const accountDict = JSON.parse(accountListJson)
    const accountList = accountDict.value
    this.setData({
      accountList: accountList,
      pageType: "搜索"
    })
  },

  /**
   * 正常跳转
   */
  handleTypeList: function(tempType) {
    const accountList = util.getAccountWith(tempType, app.globalData.accountList)
    if (accountList.length === 0) {
      this.setData({
        accType: tempType,
        emptyInfo: "暂无 " + tempType + " 的帐号，点击右下角的按钮去添加一个吧^_^"
      })
    } else {
      this.setData({
        accType: tempType,
        accountList: accountList,
        // 避免删除分类下最后一个帐号后，不会显示信息
        emptyInfo: "暂无 " + tempType + " 的帐号，点击右下角的按钮去添加一个吧^_^"
      })
    }
  },

  // 更新导航栏上显示的帐号数量
  updateAccountCount: function() {
    if (this.data.accType !== "") {
      wx.setNavigationBarTitle({
        title: this.data.accType + '帐号(' + this.data.accountList.length + ')',
      })
    } else {
      wx.setNavigationBarTitle({
        title: "搜索结果(" + this.data.accountList.length + ')',
      })
    }
  },

  // 右下角的浮动按钮
  jumpToAdd: function() {
    wx.navigateTo({
      url: '../adding_account/account?accType=' + this.data.accType + '&pageType=添加',
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 判断跳转类型
    var pageType = options.type || ""
    if (pageType === "") {
      this.handleSearchList(options.accountListJson)
    } else {
      this.handleTypeList(pageType)
    }
  },

  onShow: function() {
    this.updateAccountCount()
  }
})