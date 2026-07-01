const app = getApp()

Page({
  data: {
    cartList: [],
    subtotal: 0,
    totalCount: 3,
    dinerName: '张三',
    remark: '',
    safeAreaBottom: 34
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      safeAreaBottom: systemInfo.safeArea.bottom - systemInfo.safeArea.height,
      cartList: app.globalData.cartList
    })
    this.calculateTotal()
  },

  calculateTotal() {
    const cartList = this.data.cartList
    const subtotal = cartList.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const totalCount = Math.max(1, Math.ceil(cartList.reduce((sum, item) => sum + item.quantity, 0) / 2))

    this.setData({
      subtotal,
      totalCount
    })
  },

  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    })
  },

  onBack() {
    wx.navigateBack()
  },

  onSubmit() {
    if (this.data.cartList.length === 0) {
      wx.showToast({ title: '购物车是空的', icon: 'none' })
      return
    }

    // 创建订单
    const order = {
      id: '20' + new Date().getFullYear() + (new Date().getMonth() + 1).toString().padStart(2, '0') + new Date().getDate().toString().padStart(2, '0') + Math.floor(Math.random() * 1000).toString().padStart(3, '0'),
      dishes: this.data.cartList.map(item => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price
      })),
      total: this.data.subtotal,
      status: 'pending',
      time: new Date().toTimeString().slice(0, 5),
      date: '今天',
      remark: this.data.remark
    }

    app.globalData.orders.unshift(order)

    // 清空购物车
    app.globalData.cartList = []

    wx.showToast({
      title: '订单提交成功',
      icon: 'success',
      duration: 1500
    })

    setTimeout(() => {
      wx.switchTab({
        url: '/pages/my/my'
      })
    }, 1500)
  }
})
