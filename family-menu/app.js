App({
  globalData: {
    dishes: [],
    cart: [],
    orders: []
  },

  onLaunch() {
    this.loadDishes();
    this.loadCart();
    this.loadOrders();
  },

  loadDishes() {
    const dishes = wx.getStorageSync('dishes');
    if (dishes && dishes.length > 0) {
      this.globalData.dishes = dishes;
    } else {
      const defaultDishes = this.getDefaultDishes();
      this.globalData.dishes = defaultDishes;
      wx.setStorageSync('dishes', defaultDishes);
    }
  },

  loadCart() {
    const cart = wx.getStorageSync('cart');
    if (cart) {
      this.globalData.cart = cart;
    }
  },

  loadOrders() {
    const orders = wx.getStorageSync('orders');
    if (orders) {
      this.globalData.orders = orders;
    }
  },

  getDefaultDishes() {
    return [
      {
        id: 'dish_001',
        name: '红烧肉',
        category: 'meat',
        price: 38.00,
        description: '精选五花肉，慢火炖煮，入口即化，肥而不腻',
        image: '/assets/images/dish-red-pork.jpg',
        createdAt: Date.now()
      },
      {
        id: 'dish_002',
        name: '糖醋排骨',
        category: 'meat',
        price: 42.00,
        description: '外酥里嫩，酸甜可口，开胃下饭',
        image: '/assets/images/dish-pork-ribs.jpg',
        createdAt: Date.now()
      },
      {
        id: 'dish_003',
        name: '清炒时蔬',
        category: 'vegetable',
        price: 18.00,
        description: '新鲜时令蔬菜，清淡爽口，营养健康',
        image: '/assets/images/dish-vegetable.jpg',
        createdAt: Date.now()
      },
      {
        id: 'dish_004',
        name: '西红柿炒蛋',
        category: 'home',
        price: 16.00,
        description: '经典家常菜，酸甜开胃，老少皆宜',
        image: '/assets/images/dish-tomato-egg.jpg',
        createdAt: Date.now()
      },
      {
        id: 'dish_005',
        name: '宫保鸡丁',
        category: 'meat',
        price: 35.00,
        description: '香辣可口，花生酥脆，鸡肉嫩滑',
        image: '/assets/images/dish-kung-pao.jpg',
        createdAt: Date.now()
      },
      {
        id: 'dish_006',
        name: '紫菜蛋花汤',
        category: 'soup',
        price: 12.00,
        description: '鲜香清淡，简单美味，饭前开胃',
        image: '/assets/images/dish-soup.jpg',
        createdAt: Date.now()
      },
      {
        id: 'dish_007',
        name: '鱼香肉丝',
        category: 'meat',
        price: 32.00,
        description: '咸甜酸辣，香味浓郁，下饭神器',
        image: '/assets/images/dish-fish-flavor.jpg',
        createdAt: Date.now()
      },
      {
        id: 'dish_008',
        name: '白米饭',
        category: 'staple',
        price: 3.00,
        description: '香软可口，颗粒分明，主食必备',
        image: '/assets/images/dish-rice.jpg',
        createdAt: Date.now()
      }
    ];
  },

  getDishes() {
    return this.globalData.dishes;
  },

  getDishById(id) {
    return this.globalData.dishes.find(d => d.id === id);
  },

  addDish(dish) {
    const newDish = {
      ...dish,
      id: 'dish_' + Date.now(),
      createdAt: Date.now()
    };
    this.globalData.dishes.push(newDish);
    wx.setStorageSync('dishes', this.globalData.dishes);
    return true;
  },

  deleteDish(id) {
    const index = this.globalData.dishes.findIndex(d => d.id === id);
    if (index > -1) {
      this.globalData.dishes.splice(index, 1);
      wx.setStorageSync('dishes', this.globalData.dishes);
      return true;
    }
    return false;
  },

  getCart() {
    return this.globalData.cart;
  },

  addToCart(dishId, quantity = 1) {
    const existingItem = this.globalData.cart.find(item => item.dishId === dishId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      this.globalData.cart.push({
        dishId,
        quantity,
        selectedAt: Date.now()
      });
    }
    wx.setStorageSync('cart', this.globalData.cart);
    return true;
  },

  updateCartItem(dishId, quantity) {
    const item = this.globalData.cart.find(item => item.dishId === dishId);
    if (item) {
      if (quantity <= 0) {
        return this.removeFromCart(dishId);
      }
      item.quantity = quantity;
      wx.setStorageSync('cart', this.globalData.cart);
      return true;
    }
    return false;
  },

  removeFromCart(dishId) {
    const index = this.globalData.cart.findIndex(item => item.dishId === dishId);
    if (index > -1) {
      this.globalData.cart.splice(index, 1);
      wx.setStorageSync('cart', this.globalData.cart);
      return true;
    }
    return false;
  },

  clearCart() {
    this.globalData.cart = [];
    wx.setStorageSync('cart', this.globalData.cart);
  },

  getCartTotal() {
    let total = 0;
    this.globalData.cart.forEach(item => {
      const dish = this.getDishById(item.dishId);
      if (dish) {
        total += dish.price * item.quantity;
      }
    });
    return total;
  },

  getOrders() {
    return this.globalData.orders;
  },

  createOrder() {
    if (this.globalData.cart.length === 0) {
      return null;
    }

    const order = {
      id: 'order_' + Date.now(),
      items: JSON.parse(JSON.stringify(this.globalData.cart)),
      totalPrice: this.getCartTotal(),
      status: 'pending',
      createdAt: Date.now()
    };

    this.globalData.orders.push(order);
    wx.setStorageSync('orders', this.globalData.orders);
    this.clearCart();
    return order;
  },

  getOrderById(id) {
    return this.globalData.orders.find(o => o.id === id);
  }
});
