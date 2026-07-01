const app = getApp()

Page({
  data: {
    cartList: [],
    subtotal: 0,
    safeAreaBottom: 34,
    placeholderColors: [
      'linear-gradient(135deg, #FF6B35 0%, #FF9F0A 100%)',
      'linear-gradient(135deg, #FFCDD2 0%, #F8BBD9 100%)',
      'linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%)',
      'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
      'linear-gradient(135deg, #FFF9C4 0%, #FFF176 100%)',
      'linear-gradient(135deg, #FFE0EC 0%, #FFCDD2 100%)'
    ]
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      safeAreaBottom: systemInfo.safeArea.bottom - systemInfo.safeArea.height
    })
  },

  onShow() {
    this.updateCart()
  },

  updateCart() {
    const cartList = app.globalData.cartList.map((item, index) => ({
      ...item,
      placeholderColor: this.data.placeholderColors[index % 6]
    }))

    const subtotal = cartList.reduce((sum, item) => sum + item.price * item.quantity, 0)

    this.setData({
      cartList,
      subtotal
    })
  },

  onMinus(e) {
    const index = e.currentTarget.dataset.index
    const cartList = this.data.cartList

    if (cartList[index].quantity > 1) {
      cartList[index].quantity--
      app.globalData.cartList = cartList
      this.updateCart()
    } else {
      wx.showModal({
        title: '提示',
        content: '确定要删除这个菜品吗？',
        success: (res) => {
          if (res.confirm) {
            cartList.splice(index, 1)
            app.globalData.cartList = cartList
            this.updateCart()
          }
        }
      })
    }
  },

  onPlus(e) {
    const index = e.currentTarget.dataset.index
    const cartList = this.data.cartList
    cartList[index].quantity++
    app.globalData.cartList = cartList
    this.updateCart()
  },

  onGoShopping() {
    wx.switchTab({
      url: '/pages/dishList/dishList'
    })
  },

  onSubmit() {
    if (this.data.cartList.length === 0) {
      wx.showToast({ title: '购物车是空的', icon: 'none' })
      return
    }

    wx.navigateTo({
      url: '/pages/orderConfirm/orderConfirm'
    })
  }
})
