Page({
  /**
   * 页面的初始数据
   */
  data: {
    addList: [
      {
        "iconPath":"../../images/random.png",
        "title":"随机生成密码",
        "detail":"",
        "url": "../adding_randomPwd/randomPwd"
      },
      {
        "iconPath": "../../images/account.png",
        "title": "添加已有帐号",
        "detail": "",
        "url": "../adding_account/account"
      },
    ],
    codeList: [
      {
        "iconPath": "../../images/code.png",
        "title": "明文加密",
        "detail": "",
        "url": "../adding_readablePwd/readablePwd"
      },
      {
        "iconPath": "../../images/hashtag.png",
        "title": "哈希散列",
        "detail": "",
        "url": "../adding_hashPwd/hashPwd"
      }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
})