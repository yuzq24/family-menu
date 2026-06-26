const app = getApp();

Page({
  data: {
    cartItems: [],
    totalPrice: 0
  },

  onShow() {
    this.loadCart();
  },

  loadCart() {
    const cart = app.getCart();
    const cartItems = cart.map(item => {
      const dish = app.getDishById(item.dishId);
      return {
        ...dish,
        quantity: item.quantity,
        emoji: this.getEmoji(dish.category)
      };
    }).filter(item => item.id);

    this.setData({
      cartItems,
      totalPrice: app.getCartTotal().toFixed(2)
    });
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

  onDecrease(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.cartItems.find(i => i.id === id);
    if (item && item.quantity > 1) {
      app.updateCartItem(id, item.quantity - 1);
      this.loadCart();
    }
  },

  onIncrease(e) {
    const id = e.currentTarget.dataset.id;
    const item = this.data.cartItems.find(i => i.id === id);
    if (item) {
      app.updateCartItem(id, item.quantity + 1);
      this.loadCart();
    }
  },

  onDelete(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要从购物车中删除该菜品吗？',
      success: (res) => {
        if (res.confirm) {
          app.removeFromCart(id);
          this.loadCart();
        }
      }
    });
  },

  onGoMenu() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  onCheckout() {
    wx.navigateTo({
      url: '/pages/order/order'
    });
  }
});
