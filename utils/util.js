const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 获得已经拥有的分类，单分类的状态发生改变，也需要变更
 */
const getExistClassify = accountClassify => {
  var existClassify = []
  accountClassify.forEach(function (classify, index) {
    if (classify.name != "全部" && classify.name != "管理") {
      existClassify.push(classify.name)
    }
  })
  return existClassify
}

/**
 * 更新保存的帐号信息
 */
function updateAccount(account) {
  const allAccountList = wx.getStorageSync('account') || []
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
 * 根据分类获取帐号信息
 */
const getAccountWith = accType => {
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

module.exports = {
  formatTime: formatTime,
  getExistClassify: getExistClassify,
  updateAccount: updateAccount,
  getAccountWith: getAccountWith
}

