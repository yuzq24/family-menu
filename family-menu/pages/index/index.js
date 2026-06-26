const app = getApp();

Page({
  data: {
    dishes: [],
    filteredDishes: [],
    categories: [
      { key: 'all', name: '全部' },
      { key: 'home', name: '家常菜' },
      { key: 'meat', name: '肉类' },
      { key: 'vegetable', name: '素菜' },
      { key: 'soup', name: '汤类' },
      { key: 'staple', name: '主食' }
    ],
    currentCategory: 'all',
    searchKey: ''
  },

  onLoad() {
    this.loadDishes();
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
      dishes: dishesWithEmoji,
      filteredDishes: dishesWithEmoji
    });
    this.filterDishes();
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

  onCategoryChange(e) {
    const category = e.currentTarget.dataset.category;
    this.setData({
      currentCategory: category
    });
    this.filterDishes();
  },

  onSearch(e) {
    this.setData({
      searchKey: e.detail.value
    });
    this.filterDishes();
  },

  filterDishes() {
    const { dishes, currentCategory, searchKey } = this.data;
    let filtered = dishes;

    if (currentCategory !== 'all') {
      filtered = filtered.filter(d => d.category === currentCategory);
    }

    if (searchKey) {
      const key = searchKey.toLowerCase();
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(key) ||
        d.description.toLowerCase().includes(key)
      );
    }

    this.setData({
      filteredDishes: filtered
    });
  },

  onDishTap(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/detail/detail?id=' + id
    });
  },

  onAddToCart(e) {
    const id = e.currentTarget.dataset.id;
    app.addToCart(id, 1);
    wx.showToast({
      title: '已加入购物车',
      icon: 'success',
      duration: 1500
    });
  }
});
