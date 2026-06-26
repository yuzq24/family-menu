const app = getApp();

Page({
  data: {
    dishes: []
  },

  onShow() {
    this.loadDishes();
  },

  loadDishes() {
    const dishes = app.getDishes();
    const dishesWithEmoji = dishes.map(dish => ({
      ...dish,
      emoji: this.getEmoji(dish.category)
    }));
    this.setData({
      dishes: dishesWithEmoji
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

  onDeleteDish(e) {
    const id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '确认删除',
      content: '确定要删除该菜品吗？',
      success: (res) => {
        if (res.confirm) {
          app.deleteDish(id);
          wx.showToast({
            title: '删除成功',
            icon: 'success'
          });
          this.loadDishes();
        }
      }
    });
  }
});
