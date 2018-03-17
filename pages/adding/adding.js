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
        "iconPath": "../../images/decode.png",
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})