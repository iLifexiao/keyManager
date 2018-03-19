Page({

  /**
   * 页面的初始数据
   */
  data: {
    helpList: [
      {
        "question": "怎么使用AES加密呀？",
        "qIndex": 0,
        "qAnswer": "输入16位密钥和16位密钥偏移即可"
      },
      {
        "question": "编码验证是什么意思呀？",
        "qIndex": 1,
        "qAnswer": "将明文通过编码规则转换为密文"
      },
      {
        "question": "我的密码安全吗？",
        "qIndex": 2,
        "qAnswer": "程序不会上传任何数据，并且代码开源"
      },
      {
        "question": "忘记登录密码怎么办啊？",
        "qIndex": 3,
        "qAnswer": "登录密码是验证用户身份的唯一标识，不能重置。如有导出帐号信息，可以用来恢复"
      },
      {
        "question": "怎么导入密码啊?",
        "qIndex": 4,
        "qAnswer": "在电话簿找到名为（帐号备份）的联系人，拷贝备注信息到导入区即可"
      },
      {
        "question": "导出的密码在哪儿呀？",
        "qIndex": 5,
        "qAnswer": "在电话簿找到名为（帐号备份）的联系人，期中备注信息就是导出的密码"
      },
      {
        "question": "导出的密码怎么是一大串符号？",
        "qIndex": 6,
        "qAnswer": "为了保障数据安全，采用AES加密数据，可以通过你设置的AES密钥恢复"
      },
      {
        "question": "默认的AES密码是多少？",
        "qIndex": 7,
        "qAnswer": "默认 key: 1234123412341234\n默认 iv: 1111111111111111"
      }            
    ]
  },

  answer: function(e) {
    /**
     * 数据集以data-开头，多个单词由连字符-链接，
     * 不能有大写(大写会自动转成小写)如data-element-type，
     * 最终在 event.currentTarget.dataset 中会将连字符转成驼峰elementType
     */

    const qIndex = e.currentTarget.dataset.qIndex    
    const qAnswer = this.data.helpList[qIndex].qAnswer
    wx.showModal({
      title: '回答',
      content: qAnswer,
      showCancel: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    
  }
})