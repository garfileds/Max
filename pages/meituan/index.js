//meitaun.js

//获取应用实例
const app = getApp()

// api
// const apiEarnEnvelope = 'http://localhost:8080/api/envelope'
const apiEarnEnvelope = 'http://www.iotxing.org/api/envelope/'
const pageCur = '/page/meituan/index'

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    envelopes: []
  },
  //事件处理函数
  onLoad: function () {
    let curEnvelopes = []

    // 设置待渲染的红包列表
    if (app.globalData.envelopes) {
      curEnvelopes = app.globalData.envelopes.filter(item => item.company === '美团')
      this.setData({
        envelopes: curEnvelopes
      })
    } else {
      app.envelopesReadyCallback = res => {
        curEnvelopes = app.globalData.envelopes.filter(item => item.company === '美团')

        this.setData({
          envelopes: curEnvelopes
        })
      }
    }
  },

  onPullDownRefresh() {
    wx.reLaunch({
      url: pageCur,
    })
  },

  earnEnvelope(evt) {
    const target = evt.target

    if (target.dataset.envelopeid) {
      wx.request({
        url: apiEarnEnvelope,
        method: 'POST',
        data: {
          user_id: app.globalData.userId,
          tid: target.dataset.envelopeid
        },

        success: function(response) {
          const data = response.data
          if (data.code === 'ok') {
            wx.navigateTo({
              url: `/pages/outerLink/index?target=${data.url}`,
            })
          }
        }
      })
    }
  }
})
