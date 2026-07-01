const app = getApp()

Page({
  data: {

  },

  onOrderHistory() {
    wx.navigateTo({
      url: '/pages/orderHistory/orderHistory'
    })
  },

  onAddress() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },

  onFamily() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  },

  onSettings() {
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    })
  }
})
