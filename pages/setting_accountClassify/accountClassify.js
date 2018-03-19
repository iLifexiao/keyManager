Page({
  /**
   * 页面的初始数据
   */
  data: {    
    urlType: "",
    accountClassify: [],

    // 用于判断分类的图片是否已经存在
    existIconPathList: [],

    existClassify: [],
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
          tempIconPath: tempFilePaths
        })
      },
    });
  },

  addAccountClassify: function (e) {
    const tempName = this.data.tempName

    if (tempName.length == 0) {
      wx.showToast({
        title: '名称不能为空',
        image: '/images/exclamatory-mark.png'
      })
      return
    }
    if (this.data.existClassify.indexOf(tempName) != -1) {
      wx.showToast({
        title: '该分类已经存在',
        image: '/images/exclamatory-mark.png'
      })
      return
    }

    const tempUrl = "../showAccount/showaccount?type=" + tempName

    // 判断是否更改了默认图标    
    if (this.data.tempIconPath == '/images/package.png') {
      this.setData({
        classify: {
          "name": tempName,
          "iconPath": "/images/package.png",
          "url": tempUrl
        }
      })
      console.log(this.data.classify)
      // 根据不同的按钮类型，进行不同的操作    
      if (e.currentTarget.id == "添加") {
        this.addNewClassify(this.data.classify)
      } else if (e.currentTarget.id == "更新") {
        this.modifyClassify(this.data.currentClassifyIndex)
      }  
      this.updateAccountClassifyData(this.data.accountClassify)
    } else {
      // 在保存文件的时候校验文件是否已经保存
      // 新的icon
      if (this.data.existIconPathList.indexOf(this.data.tempIconPath) == -1) {
        wx.saveFile({
          tempFilePath: this.data.tempIconPath,
          success: res => {
            this.setData({
              classify: {
                "name": tempName,
                "iconPath": res.savedFilePath,
                "url": tempUrl
              }
            })
            console.log(this.data.classify)

            if (e.currentTarget.id == "添加") {
              this.addNewClassify(this.data.classify)
            } else if (e.currentTarget.id == "更新") {
              this.modifyClassify(this.data.currentClassifyIndex)
            }
            this.updateAccountClassifyData(this.data.accountClassify)
          }
        })
      } else {
        this.setData({
          classify: {
            "name": tempName,
            "iconPath": this.data.tempIconPath,
            "url": tempUrl
          }
        })
        console.log(this.data.classify)
        if (e.currentTarget.id == "添加") {
          this.addNewClassify(this.data.classify)
        } else if (e.currentTarget.id == "更新") {
          this.modifyClassify(this.data.currentClassifyIndex)
        }
        this.updateAccountClassifyData(this.data.accountClassify)
      }
    }
  },

  checkAccountClassifyName: function (e) {
    this.setData({
      tempName: e.detail.value
    })
  },

  /**
   * 功能分离
   */
  addNewClassify: function (classify) {
    var accountClassify = this.data.accountClassify
    accountClassify.push(classify)
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
   * 更新上一页面的分类信息 & 缓存数据 & 当前的信息
   */
  updateAccountClassifyData: function (accountClassify) {
    this.getExistClassify(accountClassify)
    var pages = getCurrentPages()
    var that = pages[pages.length - 2]
    if (that.__route__ == "pages/main/main") {
      that.setData({
        accountClassify: accountClassify
      })
    }
    wx.setStorage({
      key: 'accountClassify',
      data: accountClassify,
      success: res => {
        wx.showToast({
          title: '更新成功',
        })
      }
    })
  },

  /**
   * 改变分类的状态
   */  
  changeClassify: function (e) {
    const classifyName = e.currentTarget.id
    // 记录当前点击的行
    const currentClassifyIndex = this.data.existClassify.indexOf(classifyName)    
    console.log(currentClassifyIndex)
    this.setData({
      currentClassifyIndex: currentClassifyIndex
    })
    // 排除系统定义的分类
    if (this.data.existClassify.indexOf(classifyName) > 8) {
      wx.showActionSheet({
        itemList: ["编辑", "删除"],
        itemColor: '#00ADB7',        
        success: res => {
          if (!res.cancel) {            
            switch (res.tapIndex) {
              case 0:                               
                this.editClassify(classifyName);
                break;
              case 1:
                this.deleteClassify(classifyName);
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
  editClassify: function (classifyName) {   
    const currentClassifyIndex = this.data.currentClassifyIndex
    const currentClassify = this.data.accountClassify[currentClassifyIndex]
    console.log(currentClassify)
    this.setData({
      currentClassifyIndex: currentClassifyIndex,
      tempIconPath: currentClassify.iconPath,
      tempName: currentClassify.name,
      buttonType: "更新"
    })
  },

  /**
   * 点击删除
   */
  deleteClassify: function (classify) {
    var accountClassify = this.data.accountClassify
    console.log(accountClassify)
    const popCount = accountClassify.length - this.data.currentClassifyIndex
    console.log(popCount)
    var popArray = []
    for (var i = 0; i < popCount; ++i) {
      popArray.push(accountClassify.pop())
    }

    // 反转Array
    for (var i = 0; i < popArray.reverse().length - 1; ++i) {
      accountClassify.push(popArray.pop())
    }
    console.log(accountClassify)
    this.setData({
      accountClassify: accountClassify
    })
    this.updateAccountClassifyData(accountClassify)
  },


  /**
   * 获得已经拥有的分类，单分类的状态发生改变，也需要变更
   */
  getExistClassify: function (accountClassify) {
    var existClassify = []
    accountClassify.forEach(function (classify, index) {
      existClassify.push(classify.name)
    })
    console.log(existClassify)
    this.setData({
      existClassify: existClassify
    })
  },

  /**
   * 获得以及保存的icon
   */
  getExistIconPathList: function () {
    var existFileList = []
    var existIconPathList = []
    wx.getSavedFileList({
      success: res=> {        
        existFileList = res.fileList
        console.log(existFileList)
        existFileList.forEach(function (icon, index) {
          existIconPathList.push(icon.filePath)
        })
        console.log(existIconPathList)
        // 更新已存在的icno状态
        this.setData({
          existIconPathList: existIconPathList
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const accountClassify = wx.getStorageSync('accountClassify')
    // 获取已经存在的分类
    this.getExistClassify(accountClassify)
    this.setData({
      accountClassify: accountClassify,
    })
    // 获取已经存在的icon文件地址
    this.getExistIconPathList()
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

  },
})