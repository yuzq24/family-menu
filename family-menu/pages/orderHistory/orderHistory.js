const app = getApp()

Page({
  data: {
    orders: [],
    filteredOrders: [],
    statusTabs: ['全部', '待制作', '制作中', '已完成'],
    currentStatus: 0
  },

  onLoad() {
    this.loadOrders()
  },

  onShow() {
    this.loadOrders()
  },

  loadOrders() {
    const orders = app.globalData.orders.map(order => {
      const dishText = order.dishes.map(d => `${d.name} x${d.quantity}`).join(', ')
      let statusText = ''
      switch (order.status) {
        case 'pending':
          statusText = '待制作'
          break
        case 'making':
          statusText = '制作中'
          break
        case 'completed':
          statusText = '已完成'
          break
        default:
          statusText = '未知'
      }
      return {
        ...order,
        dishText,
        statusText
      }
    })

    this.setData({
      orders
    })
    this.filterOrders()
  },

  onStatusTap(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      currentStatus: index
    })
    this.filterOrders()
  },

  filterOrders() {
    const { orders, currentStatus } = this.data

    let filtered = orders
    if (currentStatus > 0) {
      const statusMap = ['pending', 'making', 'completed']
      const targetStatus = statusMap[currentStatus - 1]
      filtered = orders.filter(order => order.status === targetStatus)
    }

    this.setData({
      filteredOrders: filtered
    })
  },

  onBack() {
    wx.navigateBack()
  },

  onReorder(e) {
    const index = e.currentTarget.dataset.index
    const order = this.data.filteredOrders[index]

    // 将订单中的菜品添加到购物车
    order.dishes.forEach(dish => {
      const existingItem = app.globalData.cartList.find(item => item.name === dish.name)
      if (existingItem) {
        existingItem.quantity += dish.quantity
      } else {
        const originalDish = app.globalData.dishList.find(d => d.name === dish.name)
        if (originalDish) {
          app.globalData.cartList.push({
            ...originalDish,
            quantity: dish.quantity
          })
        }
      }
    })

    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500
    })

    setTimeout(() => {
      wx.switchTab({
        url: '/pages/cart/cart'
      })
    }, 1500)
  }
})
