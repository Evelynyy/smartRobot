//index.js
//获取应用实例
var app = getApp()
var that;
var chatListData = []

Page({
  data: {
    askWord: '',
    userInfo: {},
    chatList: []
  },
 
  onLoad: function () {
    that = this
    //获取用户信息
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },

  // 初始化
  onReady: function () {
    // 问候语
    setTimeout(function () {
      that.addMsg("你好啊，我能帮您做点什么吗？", 'l')
    }, 1000)
  },

  // 发送消息
  sendMsg: function (e) {
    let word = e.detail.value.ask_word ? e.detail.value.ask_word : e.detail.value;  // 支持两种提交方式
    that.addMsg(word, 'r')

    // 请求api获取回答
    app.req('post', 'openapi/api', {
      'data': {
        'info': word,
        'loc': '苏州',
        'userid': '123'
      },
      'success': function (res) {
        that.addMsg(res.text, 'l')
        if (res.url) {
          that.addMsg(res.url, 'l')
        }
      }
    })

    // 清空输入框
    that.setData({
      askWord: ''
    })
  },

  // 新增聊天列表
  addMsg: function (word, orientation) {
    let ch = {
      'text': word,
      'time': new Date().getTime(),
      'orientation': orientation
    }
    chatListData.push(ch)
    that.setData({
      chatList: chatListData
    })
  }
})
