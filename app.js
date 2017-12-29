//app.js

// const apiGetEnvelopes = 'http://localhost:8080/api/envelopes'
// const apiGetUserId = 'http://localhost:8080/api/userId'

const apiGetEnvelopes = 'http://www.iotxing.org/api/getEnvelopes/'
const apiGetUserId = 'http://www.iotxing.org/api/userId/'

App({
  onLaunch: function () {
    const self = this

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: `${apiGetUserId}${res.code}/`,
          success: function(res) {
            if (res.statusCode === 200) {
              self.globalData.userId = res.data.id
            }
          }
        })
      }
    })

    // 获取红包列表
    wx.request({
      url: apiGetEnvelopes,
      success: function(res) {
        if (res.statusCode === 200) {
          self.globalData.envelopes = res.data

          if (self.envelopesReadyCallback) {
            self.envelopesReadyCallback(res)
          }
        }
      }
    })
  },
  globalData: {
    envelopes: null,
    userId: null
  }
})