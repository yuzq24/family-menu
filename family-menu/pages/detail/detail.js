const app = getApp();

Page({
  data: {
    dish: {},
    categoryName: '',
    quantity: 1,
    dishId: ''
  },

  onLoad(options) {
    if (options.id) {
      this.setData({
        dishId: options.id
      });
      this.loadDish(options.id);
    }
  },

  loadDish(id) {
    const dish = app.getDishById(id);
    if (dish) {
      this.setData({
        dish: {
          ...dish,
          emoji: this.getEmoji(dish.category)
        },
        categoryName: this.getCategoryName(dish.category)
      });
    } else {
      wx.showToast({
        title: '菜品不存在',
        icon: 'error'
      });
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }
  },

  getEmoji(category) {
    const emojiMap = {
      'home': '🍳',
      'meat': '🥩',
      'vegetable': '🥬',
      'soup': '🍲',
      'staple': '🍚'
    };
    return emojiMap[category] || '🍽️';
  },

  getCategoryName(category) {
    const categoryMap = {
      'home': '家常菜',
      'meat': '肉类',
      'vegetable': '素菜',
      'soup': '汤类',
      'staple': '主食'
    };
    return categoryMap[category] || '其他';
  },

  onDecrease() {
    if (this.data.quantity > 1) {
      this.setData({
        quantity: this.data.quantity - 1
      });
    }
  },

  onIncrease() {
    this.setData({
      quantity: this.data.quantity + 1
    });
  },

  onAddToCart() {
    app.addToCart(this.data.dishId, this.data.quantity);
    wx.showToast({
      title: '已加入购物车',
      icon: 'success'
    });
  },

  onBuyNow() {
    app.addToCart(this.data.dishId, this.data.quantity);
    wx.navigateTo({
      url: '/pages/cart/cart'
    });
  }
});
