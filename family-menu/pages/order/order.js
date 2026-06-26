const app = getApp();

Page({
  data: {
    orderItems: [],
    totalPrice: '0.00'
  },

  onLoad() {
    this.loadOrderItems();
  },

  loadOrderItems() {
    const cart = app.getCart();
    const orderItems = cart.map(item => {
      const dish = app.getDishById(item.dishId);
      return {
        ...dish,
        quantity: item.quantity,
        emoji: this.getEmoji(dish.category)
      };
    }).filter(item => item.id);

    this.setData({
      orderItems,
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

  onSubmit() {
    if (this.data.orderItems.length === 0) {
      wx.showToast({
        title: '购物车为空',
        icon: 'error'
      });
      return;
    }

    const order = app.createOrder();
    if (order) {
      wx.showModal({
        title: '下单成功',
        content: '您的订单已提交成功！',
        showCancel: false,
        success: () => {
          wx.switchTab({
            url: '/pages/mine/mine'
          });
        }
      });
    } else {
      wx.showToast({
        title: '下单失败',
        icon: 'error'
      });
    }
  }
});
