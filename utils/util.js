import { 
  match
} from './pinyinMatch.js'

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
 * 根据输入数据的长度，来自动收起键盘
 */
function hideKeyboard(value, len) {  
  if (value.length == len) {
    wx.hideKeyboard();
  }
}

/**
 * 删除Array中index位置的数据，并返回新的数组
 */
function deleteArrayInfo(array, index) {
  const popCount = array.length - index
  let popArray = []
  for (let i = 0; i < popCount; ++i) {
    popArray.push(array.pop())
  }
  popArray = popArray.reverse()
  for (let i = 1; i < popCount; ++i) {
    array.push(popArray[i])
  }
  return array
}

/**
 * 获取对象中数组中的的位置
 * 根据内容来查找 
 */
function getIndexInObjectArray(theArray, theObject) {
  let theIndex = 0
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
  let existClassify = []
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
  let existflag = false
  allAccountList.forEach(function (item, index) {
    if (JSON.stringify(account) == JSON.stringify(item)) {
      wx.showToast({
        title: '帐号已经存在',
        image: '/images/exclamatory-mark.png'
      })
      existflag = true
    }
  })
  // 当存在相同的帐号时，返回一个空的数组表示添加失败
  if (existflag) {
    return []
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
  let accountList = []
  // 显示全部或其他分类
  if (accType == "全部") {
    return allAccountList
  }

  allAccountList.forEach(function (account, index) {
    if (account.kind == accType) {
      accountList.push(account)
    }
  })
  return accountList
}

/**
 * 根据（名称、帐号、备注）获取帐号信息
 */
function getSearchAccountWith(key, allAccountList) {
  let accountList = []  
  let lowCaseKey = key.toLowerCase()
  // 获取帐号
  allAccountList.forEach(function (account, index) {
    if (account.name.toLowerCase().search(lowCaseKey) !== -1 ||       
      account.acc.toLowerCase().search(lowCaseKey) !== -1 || 
      account.remarks.toLowerCase().search(lowCaseKey) !== -1 ||
      match(account.name, lowCaseKey)) {
        accountList.push(account)
    }
  })

  return accountList
}

/**
 * 判断输入的信息(数组)是否为空
 */
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

/**
 * 处理拷贝密码
 */
function handleCopyPwd(data, info, errInfo) {
  let dataLen = data.length
  if (info == "游戏拷贝成功") {
    dataLen -= 1
  }
  if (dataLen > 0) {
    wx.setClipboardData({
      data: data,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: info,
            })
          }
        })
      }
    })
  } else {
    wx.showToast({
      title: errInfo,
      image: '/images/exclamatory-mark.png'
    })
  }
}

/**
 * 保存帐号的限制特殊符号：-、&、？
 */
function checkSpecialMark(info) {
  let re = new RegExp("[-&?]");
  const index = info.search(re)
  // console.log("index:", index)
  if (index != -1) {
    wx.showModal({
      title: '保存提示',
      content: '帐号里不能包含「-、&、?」这三个特殊符号',
      showCancel: false
    })
    return true
  }
  return false
}

// 替换 # --> \ 因为微信的转发信息用 # 来分割，导致字典被破坏
function replaceAll(data, source, target) {
  let re = new RegExp(source, 'gm');
  let str = data.replace(re, target)
  return str
}

/**
 * 处理账号显示长度问题
 */
function handleAccountLength(account) {
  // 处理账号名称
  var tempName = account.name
  if (tempName.length > 6) {
    tempName = tempName.substring(0, 6) + '...'
  }

  // 处理备注过长的问题
  var tempRemarks = account.remarks
  if (tempRemarks.length > 15) {
    tempRemarks = tempRemarks.substring(0, 15) + '...'
  }
  if (tempRemarks.length == 0) {
    tempRemarks = '...'
  }

  return {    
    name: tempName,
    remarks: tempRemarks
  }
}

module.exports = {
  formatTime: formatTime,
  replaceAll: replaceAll,
  checkSpecialMark: checkSpecialMark,
  isEmptyInput: isEmptyInput,
  deleteArrayInfo: deleteArrayInfo,
  getIndexInObjectArray: getIndexInObjectArray,

  getExistClassify: getExistClassify,

  addAccount: addAccount,
  getAccountWith: getAccountWith,
  getSearchAccountWith: getSearchAccountWith,
  handleAccountLength: handleAccountLength,

  hideKeyboard: hideKeyboard,

  handleCopyPwd: handleCopyPwd
}

