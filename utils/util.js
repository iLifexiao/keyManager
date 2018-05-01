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
 * 删除 Array中的数据的任一 index 位置的数据 
 */
function deleteArrayInfo(array, index) {
  const popCount = array.length - index
  var popArray = []
  for (var i = 0; i < popCount; ++i) {
    popArray.push(array.pop())
  }
  popArray = popArray.reverse()
  for (var i = 1; i < popCount; ++i) {
    array.push(popArray[i])
  }
  return array
}

/**
 * 获取对象中数组中的的位置
 * 根据内容来查找 
 */
function getIndexInObjectArray(theArray, theObject) {
  var theIndex = 0
  theArray.forEach(function (item, index) {
    if (JSON.stringify(theObject) == JSON.stringify(item)) {
      theIndex = index
    }
  })
  return theIndex
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
 * 保存的帐号信息
 * 
 * 避免出现两个完全相同的帐号
 * 因为对象数组中判断两个对象是否相同，这两个数据都必须是该对象数组中的
 * 即使两个对象的内容完全相同
 */
function addAccount(account, allAccountList) {
  var existflag = false
  // const allAccountList = wx.getStorageSync('account') || []
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
  return allAccountList
}

/**
 * 根据分类获取帐号信息
 */
function getAccountWith(accType, allAccountList) {
  var accountList = []
  // 采用缓存，提高存取速度
  // const allAccountList = wx.getStorageSync('account') || []
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
function getSearchAccountWith(accName, allAccountList) {
  var accountList = []
  // const allAccountList = wx.getStorageSync('account') || []
  // 获取帐号
  allAccountList.forEach(function (account, index) {
    if (account.name.search(accName) != -1) {
      accountList.push(account)
    }
  })

  return accountList
}

function isEmptyInput(data, info) {
  if (data.length == 0) {
    wx.showToast({
      title: info,
      image: '/images/exclamatory-mark.png'
    })
    return true
  }
  return false
}



module.exports = {
  formatTime: formatTime,
  isEmptyInput: isEmptyInput,
  deleteArrayInfo: deleteArrayInfo,
  getIndexInObjectArray: getIndexInObjectArray,

  getExistClassify: getExistClassify,

  addAccount: addAccount,
  getAccountWith: getAccountWith,
  getSearchAccountWith: getSearchAccountWith,
  

}

