const app = getApp()

Page({
  data: {
    categories: ['全部', '荤菜', '素菜', '汤品', '主食', '甜品'],
    currentCategory: 0,
    searchKeyword: '',
    filteredDishes: [],
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
    this.setData({
      filteredDishes: app.globalData.dishList
    })
  },

  onShow() {
    this.filterDishes()
  },

  onSearch(e) {
    this.setData({
      searchKeyword: e.detail.value
    })
    this.filterDishes()
  },

  onCategoryTap(e) {
    const index = e.currentTarget.dataset.index
    this.setData({
      currentCategory: index
    })
    this.filterDishes()
  },

  filterDishes() {
    const { currentCategory, searchKeyword } = this.data
    let dishes = app.globalData.dishList

    // 按分类筛选
    if (currentCategory > 0) {
      const categoryName = this.data.categories[currentCategory]
      dishes = dishes.filter(dish => dish.category === categoryName)
    }

    // 按关键词搜索
    if (searchKeyword) {
      dishes = dishes.filter(dish =>
        dish.name.includes(searchKeyword) ||
        dish.description.includes(searchKeyword)
      )
    }

    this.setData({
      filteredDishes: dishes
    })
  },

  onDishTap(e) {
    const dishId = e.currentTarget.dataset.id
    wx.navigateTo({
      url: `/pages/dishDetail/dishDetail?id=${dishId}`
    })
  },

  onAddTap(e) {
    const dishId = e.currentTarget.dataset.id
    const dish = app.globalData.dishList.find(d => d.id === dishId)

    if (dish) {
      const existingItem = app.globalData.cartList.find(item => item.id === dishId)
      if (existingItem) {
        existingItem.quantity++
      } else {
        app.globalData.cartList.push({
          ...dish,
          quantity: 1
        })
      }

      wx.showToast({
        title: '已加入购物车',
        icon: 'success',
        duration: 1500
      })
    }
  },

  onAddDishTap() {
    wx.navigateTo({
      url: '/pages/addDish/addDish'
    })
  }
})
