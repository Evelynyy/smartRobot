//app.js
App({
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  },

  // Reques function
  req: function (method, url, arg) {
    let domain = '暂时没有域名',
        data = {
          'key': '没有密钥'
        },
        dataType = 'json',
        header = {
          'content-type': 'application/x-www-form-urlencoded'
        }
    
    if (arg.data) {
      data = Object.assign(data, arg.data)
    }
    if (arg.header) {
      header = Object.assign(header, arg.header)
    }
    if (arg.dataType) {
      dataType = arg.dataType
    }

    let request = {
      method: method.toUpperCase(),
      url: domain + url,
      data: data,
      dataType: dataType,
      header: header,
      success: function (res) {
        console.log('response content:', res.data)

        let data = res.data

        typeof arg.success == "function" && arg.success(data)
      },
      // 请求失败
      fail: function (){
        wx.showToast({
          title: '请求失败，请稍后重试',
          icon: 'success',
          duration: 2000
        })

        typeof arg.fail == "function" == arg.fail()        
      },
      // 请求完成
      complete: function () {
        typeof arg.complete == "function" && arg.complete()
      }
    }
    wx.request(request)
  }
})