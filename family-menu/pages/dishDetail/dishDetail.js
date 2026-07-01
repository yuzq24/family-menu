const app = getApp()

Page({
  data: {
    dish: {},
    quantity: 1,
    statusBarHeight: 20,
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

  onLoad(options) {
    const dishId = parseInt(options.id)
    const dish = app.globalData.dishList.find(d => d.id === dishId)

    if (dish) {
      const colorIndex = app.globalData.dishList.indexOf(dish) % 6
      this.setData({
        dish: {
          ...dish,
          placeholderColor: this.data.placeholderColors[colorIndex]
        }
      })
    }

    // 获取状态栏高度
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      statusBarHeight: systemInfo.statusBarHeight,
      safeAreaBottom: systemInfo.safeArea.bottom - systemInfo.safeArea.height
    })
  },

  onMinus() {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1
      })
    }
  },

  onPlus() {
    this.setData({
      quantity: this.data.quantity + 1
    })
  },

  onAddToCart() {
    const { dish, quantity } = this.data
    const existingItem = app.globalData.cartList.find(item => item.id === dish.id)

    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      app.globalData.cartList.push({
        ...dish,
        quantity: quantity
      })
    }

    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500
    })

    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  },

  onBack() {
    wx.navigateBack()
  }
})
