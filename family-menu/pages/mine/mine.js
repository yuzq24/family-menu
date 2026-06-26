const app = getApp();

Page({
  data: {
    orders: []
  },

  onShow() {
    this.loadOrders();
  },

  loadOrders() {
    const orders = app.getOrders();
    this.setData({
      orders: orders.reverse().slice(0, 10)
    });
  },

  getDishName(dishId) {
    const dish = app.getDishById(dishId);
    return dish ? dish.name : '未知菜品';
  },

  getStatusText(status) {
    const statusMap = {
      'pending': '待处理',
      'confirmed': '已确认',
      'completed': '已完成',
      'cancelled': '已取消'
    };
    return statusMap[status] || status;
  },

  formatTime(timestamp) {
    const date = new Date(timestamp);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${month}/${day} ${hours}:${minutes}`;
  },

  onAddDish() {
    wx.navigateTo({
      url: '/pages/mine/add-dish'
    });
  },

  onManageDishes() {
    wx.navigateTo({
      url: '/pages/mine/manage-dishes'
    });
  }
});
