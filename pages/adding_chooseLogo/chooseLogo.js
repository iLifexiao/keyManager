const pinyin = require('../../utils/pinyinMatch.js')

Page({
  data: {
    inputVal: '',
    inputShowed: false,
    // 搜索类型
    searchClassify: [],
    ishaveMatchIcons: true, // 是否有匹配的icon
    tempInfo: '搜索', // input为空时的替代信息
    logoClassify: [{
        "type": "社交",
        "icons": [{
            "name": "新浪微博",
            "path": "/images/logo/sinaweibo.png"
          },
          {
            "name": "QQ",
            "path": "/images/logo/tencent.png"
          },
          {
            "name": "微信",
            "path": "/images/logo/wechat.png"
          },
          {
            "name": "百度",
            "path": "/images/logo/baidu.png"
          },
          {
            "name": "网易",
            "path": "/images/logo/netease.png"
          },
          {
            "name": "搜狐",
            "path": "/images/logo/sohu.png"
          },
          {
            "name": "谷歌",
            "path": "/images/logo/chrome.png"
          },
          {
            "name": "LINE",
            "path": "/images/logo/line.png"
          },
          {
            "name": "Twitter",
            "path": "/images/logo/twitter.png"
          },
          {
            "name": "Facebook",
            "path": "/images/logo/Facebook.png"
          },
          {
            "name": "Skype",
            "path": "/images/logo/skype.png"
          },
          {
            "name": "Ins",
            "path": "/images/logo/ins.png"
          },
          {
            "name": "MOMO",
            "path": "/images/logo/momo.png"
          },
          {
            "name": "易信",
            "path": "/images/logo/yixin.png"
          },
          {
            "name": "钉钉",
            "path": "/images/logo/dingding.png"
          }
        ]
      },
      {
        "type": "通信",
        "icons": [{
            "name": "QQ邮箱",
            "path": "/images/logo/qqmail.png"
          },
          {
            "name": "网易邮箱",
            "path": "/images/logo/mobimail.png"
          },
          {
            "name": "领英",
            "path": "/images/logo/linkedin.png"
          },
          {
            "name": "移动",
            "path": "/images/logo/10086.png"
          },
          {
            "name": "联通",
            "path": "/images/logo/10010.png"
          },
          {
            "name": "电信",
            "path": "/images/logo/10000.png"
          },
          {
            "name": "Apple",
            "path": "/images/logo/apple.png"
          },
          {
            "name": "微软",
            "path": "/images/logo/windows.png"
          },
          {
            "name": "华为",
            "path": "/images/logo/huawei.png"
          },
          {
            "name": "小米",
            "path": "/images/logo/mi.png"
          },
          {
            "name": "魅族",
            "path": "/images/logo/meizu.png"
          },
          {
            "name": "锤子",
            "path": "/images/logo/chizi.png"
          },
          {
            "name": "WIFI",
            "path": "https://s1.ax1x.com/2018/09/29/ilYtyQ.png"
          }
        ]
      },
      {
        "type": "金融",
        "icons": [{
            "name": "农业银行",
            "path": "/images/logo/bankabc.png"
          },
          {
            "name": "建设银行",
            "path": "/images/logo/chinamworld.png"
          },
          {
            "name": "民生银行",
            "path": "/images/logo/mbank.png"
          },
          {
            "name": "工商银行",
            "path": "/images/logo/icbc.png"
          },
          {
            "name": "中国邮政",
            "path": "/images/logo/rytong.png"
          },
          {
            "name": "支付宝",
            "path": "/images/logo/Alipay.png"
          },
          {
            "name": "翼支付",
            "path": "/images/logo/bestpayclient.png"
          },
          {
            "name": "银联",
            "path": "/images/logo/unionpay.png"
          },
          {
            "name": "京东钱包",
            "path": "/images/logo/payment.png"
          },
        ]
      },
      {
        "type": "娱乐",
        "icons": [{
            "name": "Bilibili",
            "path": "/images/logo/bili.png"
          },
          {
            "name": "暴走漫画",
            "path": "/images/logo/baozoumanhua.png"
          },
          {
            "name": "ACFun",
            "path": "/images/logo/acfun.png"
          },
          {
            "name": "SnapChat",
            "path": "/images/logo/snapchat.png"
          },
          {
            "name": "酷狗",
            "path": "/images/logo/kugou.png"
          },
          {
            "name": "爱奇艺",
            "path": "/images/logo/qiyi.png"
          },
          {
            "name": "优酷",
            "path": "/images/logo/youku.png"
          },
          {
            "name": "快手",
            "path": "/images/logo/kuai.png"
          },
          {
            "name": "美图秀秀",
            "path": "/images/logo/mtxx.png"
          },
          {
            "name": "虾米音乐",
            "path": "/images/logo/xiami.png"
          },
          {
            "name": "猫眼电影",
            "path": "/images/logo/sankuai.png"
          },
        ]
      },
      {
        "type": "生活",
        "icons": [{
            "name": "亚马逊",
            "path": "/images/logo/amazon.png"
          },
          {
            "name": "好豆菜谱",
            "path": "/images/logo/haodou.png"
          },
          {
            "name": "唯品会",
            "path": "/images/logo/vipshop.png"
          },
          {
            "name": "问医生",
            "path": "/images/logo/wenyi.png"
          },
          {
            "name": "薄荷",
            "path": "/images/logo/boohee.png"
          },
          {
            "name": "京东",
            "path": "/images/logo/jingdong.png"
          },
          {
            "name": "美团",
            "path": "/images/logo/meituan.png"
          },
          {
            "name": "当当",
            "path": "/images/logo/dangdang.png"
          },
          {
            "name": "饿了吗",
            "path": "/images/logo/ele.png"
          },
          {
            "name": "苏宁易购",
            "path": "/images/logo/suning.png"
          },
          {
            "name": "闲鱼",
            "path": "/images/logo/fleamarket.png"
          },
          {
            "name": "淘宝",
            "path": "/images/logo/taobao.png"
          },
          {
            "name": "天猫",
            "path": "/images/logo/tmall.png"
          },
          {
            "name": "大众点评",
            "path": "/images/logo/dianping.png"
          },
          {
            "name": "掌上电力",
            "path": "https://s1.ax1x.com/2018/09/28/iQW4dP.png"
          },
          {
            "name": "水电煤气",
            "path": "https://s1.ax1x.com/2018/09/28/iQ5wlD.png"
          },
        ]
      },
      {
        "type": "出行",
        "icons": [{
            "name": "12306",
            "path": "/images/logo/12306.png"
          },
          {
            "name": "去哪儿",
            "path": "/images/logo/qunaer.png"
          },
          {
            "name": "滴滴",
            "path": "/images/logo/didi.png"
          },
          {
            "name": "携程旅行",
            "path": "/images/logo/ctrip.png"
          },
          {
            "name": "途牛旅游",
            "path": "/images/logo/tnly.png"
          },
          {
            "name": "同程旅游",
            "path": "/images/logo/tcly.png"
          },
        ]
      },
      {
        "type": "游戏",
        "icons": [{
            "name": "腾讯游戏",
            "path": "/images/logo/tg.png"
          },
          {
            "name": "网易游戏",
            "path": "/images/logo/wyg.png"
          },
          {
            "name": "Steam",
            "path": "/images/logo/steam.png"
          },
          {
            "name": "我的世界",
            "path": "/images/logo/minecraft.png"
          },
          {
            "name": "梦幻西游",
            "path": "/images/logo/mhxy.png"
          },
          {
            "name": "崩坏3",
            "path": "/images/logo/mihoyo.png"
          },
          {
            "name": "部落冲突",
            "path": "/images/logo/blct.png"
          },
          {
            "name": "虚荣",
            "path": "/images/logo/vainglory.png"
          },
        ]
      },
      {
        "type": "学习",
        "icons": [{
            "name": "GitHub",
            "path": "/images/logo/GitHub.png"
          },
          {
            "name": "VOA",
            "path": "/images/logo/voa.png"
          },
          {
            "name": "必应词典",
            "path": "/images/logo/bingdic.png"
          },
          {
            "name": "沪江网校",
            "path": "/images/logo/hjclass.png"
          },
          {
            "name": "ANKI",
            "path": "/images/logo/anki.png"
          },
          {
            "name": "小程序",
            "path": "/images/logo/miniprogram.png"
          },
          {
            "name": "掌上阅读",
            "path": "/images/logo/palmebook.png"
          },
          {
            "name": "知乎",
            "path": "/images/logo/zhihu.png"
          },
          {
            "name": "读者",
            "path": "/images/logo/reader.png"
          },
          {
            "name": "TED",
            "path": "/images/logo/ted.png"
          },
          {
            "name": "映像笔记",
            "path": "/images/logo/evernote.png"
          },
          {
            "name": "智联招聘",
            "path": "/images/logo/zhaopin.png"
          },
          {
            "name": "51Job",
            "path": "/images/logo/51job.png"
          },
          {
            "name": "牛客网",
            "path": "/images/logo/nowcoder.png"
          },
          {
            "name": "掘金",
            "path": "/images/logo/juejin.png"
          },
          {
            "name": "豆瓣",
            "path": "/images/logo/douban.png"
          },
          {
            "name": "百词斩",
            "path": "/images/logo/card.png"
          },
          {
            "name": "粉笔网",
            "path": "/images/logo/fb.png"
          },
          {
            "name": "考虫",
            "path": "/images/logo/kaochong.png"
          },
          {
            "name": "扇贝单词",
            "path": "/images/logo/shanbay.png"
          },
          {
            "name": "中关村在线",
            "path": "/images/logo/zol.png"
          },
          {
            "name": "CSDN",
            "path": "/images/logo/csdn.png"
          },
          {
            "name": "CET4",
            "path": "/images/logo/cet4.png"
          },
          {
            "name": "CET6",
            "path": "/images/logo/cet6.png"
          },
        ]
      },
      {
        "type": "工具",
        "icons": [{
            "name": "随手记",
            "path": "/images/logo/mymoney.png"
          },
          {
            "name": "UC",
            "path": "/images/logo/uc.png"
          },
          {
            "name": "VPN",
            "path": "/images/logo/vpn.png"
          },
          {
            "name": "迅雷",
            "path": "/images/logo/xunlei.png"
          },
          {
            "name": "API",
            "path": "/images/logo/APIInterface.png"
          },
          {
            "name": "豌豆荚",
            "path": "/images/logo/wandoujia.png"
          },
          {
            "name": "猪八戒",
            "path": "/images/logo/zhubajie.png"
          },
          {
            "name": "LBE安全大师",
            "path": "/images/logo/lbe.png"
          },
          {
            "name": "中华万年历",
            "path": "/images/logo/keenvim.png"
          },
          {
            "name": "火狐",
            "path": "/images/logo/firefox.png"
          },
          {
            "name": "全能扫描王",
            "path": "/images/logo/camscanner.png"
          },
          {
            "name": "Wordpress",
            "path": "/images/logo/wordpress.png"
          },
        ]
      },
    ]
  },

  _icons: [], // 记录所有icon信息

  /**
   * 这里需要用到反向传值
   * 一、可以使用 getCurrentPages 来获取到堆栈的页面，然和设置即可
   * 二、可以通过设置数据存储 wx.setStorage
   */
  selectIcon: function(e) {
    var pages = getCurrentPages()
    var that = pages[pages.length - 2]
    this.backAndPassData(that, e.currentTarget.dataset.path, e.currentTarget.dataset.name)
  },

  /**
   * 回传 图标路径 & 图标名字
   */
  backAndPassData: function(that, tempIcon, tempName) {
    wx.navigateBack({
      delta: 1,
      success: res => {
        that.setData({
          tempIcon: tempIcon,
          tempName: tempName
        })
      }
    })
  },

  /**
   * 获取所有的图标信息
   */
  getAllIcons: function() {
    let icons = this.data.logoClassify.map(item => {
      return item.icons
    })
    // 暂时不支持flat等操作
    this._icons = this.localFlat(icons)
    this.setData({
      searchClassify: this.data.logoClassify
    })
  },

  /**
   * 数组合并
   */
  localFlat: function(arr) {
    return arr.reduce((acc, val) => acc.concat(val), [])
  },

  /**
   * 搜索匹配的图标
   */
  searchMathIcons: function(title) {
    if (!title || title.length === 0) {
      this.setData({
        searchClassify: this.data.logoClassify,
        ishaveMatchIcons: false
      })
      return
    }

    let mathIcons = this._icons.filter(item => {
      return item.name.toLowerCase().search(title) !== -1 ||
        pinyin.match(item.name, title)
    }) || []

    this.setData({
      searchClassify: [{
        type: '相关图标',
        icons: mathIcons
      }]
    })

    if (mathIcons.length === 0) {
      this.setData({
        ishaveMatchIcons: false
      })
    } else {
      this.setData({
        ishaveMatchIcons: true
      })
    }
  },

  inputTyping: function(e) {
    let inputValue = e.detail.value
    this.setData({
      inputVal: inputValue
    });
    this.searchMathIcons(inputValue)
  },

  clearInput: function(e) {
    this.setData({
      inputVal: ""
    });
  },

  showInput: function(e) {
    this.setData({
      inputShowed: true
    })
  },

  hideInput: function(e) {
    this.setData({
      inputVal: "",
      inputShowed: false,
      searchClassify: this.data.logoClassify,
      ishaveMatchIcons: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAllIcons()
  },
})