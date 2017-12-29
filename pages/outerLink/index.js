// outerLink.js
Page({
  data: {
    target: ''
  },

  onLoad: function (options) {
    const target = options.target

    this.setData({
      target
    })
  }
})