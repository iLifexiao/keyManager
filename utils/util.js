function formatTime(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获得已经拥有的分类，当分类的状态发生改变，也需要变更
 */
function getExistClassify(accountClassify) {
  var existClassify = []
  accountClassify.forEach(function (classify, index) {
    if (classify.name != "全部" && classify.name != "管理") {
      existClassify.push(classify.name)
    }
  })
  return existClassify
}

/**
   * 获得以及保存的icon
   */
function getExistIconPathList() {
  var existFileList = []
  var existIconPathList = []
  wx.getSavedFileList({
    success: res => {
      existFileList = res.fileList
      // console.log(existFileList)
      existFileList.forEach(function (icon, index) {
        existIconPathList.push(icon.filePath)
      })
      return existIconPathList
    }
  })
}

/**
 * 保存的帐号信息
 * 
 * 避免出现两个完全相同的帐号
 * 因为对象数组中判断两个对象是否相同，这两个数据都必须是该对象数组中的
 * 即使两个对象的内容完全相同
 */
function addAccount(account) {
  var existflag = false
  const allAccountList = wx.getStorageSync('account') || []
  allAccountList.forEach(function (item, index) {
    if (JSON.stringify(account) == JSON.stringify(item)) {
      wx.showToast({
        title: '帐号已经存在',
        image: '/images/exclamatory-mark.png'
      })
      existflag = true
    }
  })
  if (existflag) {
    return
  }
  allAccountList.push(account)
  wx.setStorage({
    key: 'account',
    data: allAccountList,
    success: res => {
      wx.showToast({
        title: '添加成功',
      })
    }
  })
}

/**
 * 获取帐号在缓存中的位置
 */
function getAccountIndexInStore(account) {
  const allAccountList = wx.getStorageSync('account')
  var accountIndex = 0
  allAccountList.forEach(function (item, index) {
    if (JSON.stringify(account) == JSON.stringify(item)) {
      accountIndex = index      
    }
  })
  return accountIndex
}



/**
 * 根据分类获取帐号信息
 */
function getAccountWith(accType) {
  var accountList = []
  const allAccountList = wx.getStorageSync('account') || []
  // 显示全部或其他分类
  if (accType == "全部") {
    accountList = allAccountList
  } else {
    allAccountList.forEach(function (account, index) {
      if (account.kind == accType) {
        accountList.push(account)
      }
    })
  }
  return accountList
}

/**
 * 根据帐号名称获取帐号信息
 */
function getSearchAccountWith(accName) {
  var accountList = []
  const allAccountList = wx.getStorageSync('account') || []

  // 获取帐号
  allAccountList.forEach(function (account, index) {
    if (account.name.search(accName) != -1) {
      accountList.push(account)
    }
  })

  return accountList
}

module.exports = {
  formatTime: formatTime,
  getExistClassify: getExistClassify,
  getExistIconPathList: getExistIconPathList,
  addAccount: addAccount,
  getAccountWith: getAccountWith,
  getSearchAccountWith: getSearchAccountWith,
  getAccountIndexInStore: getAccountIndexInStore
}

