const util = require('../../utils/util.js')
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    urlType: "",
    accountClassify: [],    
    existClassify: [],
    
    // 用于区分添加icon的状态（已有、新的）
    iconTypeIndex: 0,
    tempIconPath: "/images/package.png",
    tempName: "",
    tempUrl: "",
    
    buttonType: "添加", // 按钮的状态：添加新的分类、更新分类    
    currentClassifyIndex: 0, // 表示当前选择（删除、更新）的分类下标
    
    // 分类对象结构
    classify: {
      "name": "",
      "iconPath": "/images/package.png",
      "url": ""
    },
  },

  selectIcon: function (e) {
    wx.chooseImage({
      count: 1,
      success: res => {
        var tempFilePaths = res.tempFilePaths[0]
        this.setData({
          tempIconPath: tempFilePaths,
          iconTypeIndex: 1
        })
      },
    });
  },

  checkAccountClassifyName: function (e) {
    this.setData({
      tempName: e.detail.value
    })
  },

  addAccountClassify: function (e) {
    if (util.isEmptyInput(this.data.tempName, "名称不能为空")) {
      return
    }  
    if (this.data.existClassify.indexOf(this.data.tempName) != -1) {
      wx.showToast({
        title: '该分类已经存在',
        image: '/images/exclamatory-mark.png'
      })
      return
    }
    const tempUrl = "../showAccount/showaccount?type=" + this.data.tempName
    // 判断是否更改了默认图标
    if (this.data.iconTypeIndex == 0) {      
      this.addWithExistIcon(this.data.tempName, tempUrl, this.data.tempIconPath)
    } else {
      this.addWithDIYIcon(this.data.tempName, tempUrl)
    }
  },

  addWithExistIcon: function (tempName, tempUrl, tempIconPath) {
    this.setData({
      classify: {
        "name": tempName,
        "iconPath": tempIconPath,
        "url": tempUrl
      }
    })
    this.handleOperation()
  },

  addWithDIYIcon: function (tempName, tempUrl) {    
    wx.saveFile({
      tempFilePath: this.data.tempIconPath,
      success: res => {
        this.setData({
          classify: {
            "name": tempName,
            "iconPath": res.savedFilePath,
            "url": tempUrl
          },
          // 更新保存的icon 和状态
          tempIconPath: res.savedFilePath,
          iconTypeIndex: 0
        })
        this.handleOperation()
      }
    })
  },

  handleOperation: function () {
    console.log(this.data.classify)
    // 根据不同的按钮类型，进行不同的操作    
    if (this.data.buttonType == "添加") {
      this.addNewClassify(this.data.classify)
    } else if (this.data.buttonType == "更新") {
      this.modifyClassify(this.data.currentClassifyIndex)
    }
    this.updateAccountClassifyData(this.data.accountClassify)
  },

  /**
   * 添加功能分离
   */
  addNewClassify: function (classify) {
    var accountClassify = this.data.accountClassify
    // 管理的分类始终在最后一个
    let lastClass = accountClassify.pop()
    accountClassify.push(classify)
    accountClassify.push(lastClass)

    this.setData({
      accountClassify: accountClassify
    })
  },

  /**
   * 更新
   */
  modifyClassify: function (currentClassifyIndex) {
    var accountClassify = this.data.accountClassify
    accountClassify[currentClassifyIndex] = this.data.classify
    this.setData({
      accountClassify: accountClassify,
      buttonType: "添加",
      tempName: "",
      tempIconPath: "/images/package.png"
    })
  },

  /**
   * 更新当前的信息 & 上一页面的分类信息 & 缓存数据 & 全局变量
   */
  updateAccountClassifyData: function (accountClassify) {
    // 当前的信息
    this.getAllClassify(accountClassify)

    // 上一页面的分类信息
    var pages = getCurrentPages()
    var that = pages[pages.length - 2]
    if (that.__route__ == "pages/main/main") {
      that.setData({
        accountClassify: accountClassify
      })
    }

    // 缓存信息
    wx.setStorage({
      key: 'accountClassify',
      data: accountClassify,
      success: res => {
        wx.showToast({
          title: '更新成功',
        })
      }
    })

    // 全局变量
    app.globalData.accountClassify = accountClassify
  },

  /**
   * 改变分类的状态
   */
  changeClassify: function (e) {
    const classifyName = e.currentTarget.id
    // 记录当前点击的行
    const currentClassifyIndex = this.data.existClassify.indexOf(classifyName)
    // console.log(currentClassifyIndex)
    this.setData({
      currentClassifyIndex: currentClassifyIndex
    })

    // 排除系统定义的分类
    if (currentClassifyIndex > 7 && classifyName !== "管理") {
      wx.showActionSheet({
        itemList: ["编辑", "删除"],
        itemColor: '#00ADB7',
        success: res => {
          if (!res.cancel) {
            switch (res.tapIndex) {
              case 0:
                this.editClassify(currentClassifyIndex);
                break;
              case 1:
                this.deleteClassify(currentClassifyIndex);
                break;
              default:
                break;
            }
          }
        }
      })
    }
  },

  /**
   * 点击分类编辑
   */
  editClassify: function (currentClassifyIndex) {
    const currentClassify = this.data.accountClassify[currentClassifyIndex]
    // console.log(currentClassify)
    this.setData({
      tempIconPath: currentClassify.iconPath,
      tempName: currentClassify.name,
      buttonType: "更新"
    })
  },

  /**
   * 点击删除
   */
  deleteClassify: function (currentClassifyIndex) {
    // 如果这里引用了 this.data 的数据
    var accountClassify = this.data.accountClassify
    // 删除图片
    let accountClass = accountClassify[currentClassifyIndex]
    if (this.isSaveUniqueIcon(accountClass.iconPath)) {
      wx.removeSavedFile({
        filePath: accountClass.iconPath,
        success: res => {
          console.log("保存的图片删除成功")
        },
        fail: res => {
          console.log("保存的图片删除失败")
        }
      })
    }
    // 这里对其修改，不仅仅改变视图层的数据，而且前面的引用也会同时修改
    this.setData({
      accountClassify: util.deleteArrayInfo(accountClassify, currentClassifyIndex)
    })
    this.updateAccountClassifyData(accountClassify)
  },

  // 判断是否为保存的图片icon
  isSaveUniqueIcon: function (iconPath) {
    // 是否为自定义图片
    if (iconPath.search("//store") != -1) {
      // 是否只有一个帐号使用了该图片
      // 通过所有帐号的图标数量来判断        
      var sameIconCount = 0
      app.globalData.accountClassify.forEach(function (accountClass, index) {
        if (accountClass.iconPath == iconPath) {
          sameIconCount += 1
        }
      })
      console.log(sameIconCount)
      if (sameIconCount > 1) {
        return false
      }
      else {
        return true
      }
    }
    return false
  },


  /**
   * 获取所有分类，包括系统的分类
   */
  getAllClassify: function (accountClassify) {
    var existClassify = []
    accountClassify.forEach(function (classify, index) {
      existClassify.push(classify.name)
    })
    this.setData({
      existClassify: existClassify
    })
  },


  /**
   * 异步API，在写成工具类的时候，可能会还没获取到数据就返回了
   * 需要在succeed时候，返回数据
   */

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      accountClassify: app.globalData.accountClassify
    })
    // 获取已经存在的分类
    this.getAllClassify(app.globalData.accountClassify)
  },
})