const app = getApp();

Page({
  data: {
    name: '',
    category: '',
    price: '',
    description: '',
    categories: [
      { key: 'home', name: '家常菜' },
      { key: 'meat', name: '肉类' },
      { key: 'vegetable', name: '素菜' },
      { key: 'soup', name: '汤类' },
      { key: 'staple', name: '主食' }
    ],
    selectedCategory: {}
  },

  onNameInput(e) {
    this.setData({
      name: e.detail.value
    });
  },

  onCategoryChange(e) {
    const index = e.detail.value;
    this.setData({
      selectedCategory: this.data.categories[index],
      category: this.data.categories[index].key
    });
  },

  onPriceInput(e) {
    this.setData({
      price: e.detail.value
    });
  },

  onDescInput(e) {
    this.setData({
      description: e.detail.value
    });
  },

  onSubmit() {
    const { name, category, price, description } = this.data;

    if (!name) {
      wx.showToast({ title: '请输入菜品名称', icon: 'error' });
      return;
    }
    if (!category) {
      wx.showToast({ title: '请选择分类', icon: 'error' });
      return;
    }
    if (!price || parseFloat(price) <= 0) {
      wx.showToast({ title: '请输入有效价格', icon: 'error' });
      return;
    }

    const dish = {
      name,
      category,
      price: parseFloat(price),
      description: description || '',
      image: ''
    };

    app.addDish(dish);
    wx.showToast({
      title: '添加成功',
      icon: 'success'
    });

    setTimeout(() => {
      wx.navigateBack();
    }, 1500);
  }
});
