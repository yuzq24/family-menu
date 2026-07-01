App({
  globalData: {
    userInfo: null,
    cartList: [],
    dishList: [
      {
        id: 1,
        name: '红烧肉',
        description: '经典家常红烧肉，软糯入味',
        price: 38,
        category: '荤菜',
        image: '/images/dish1.jpg',
        cookingTime: 45,
        difficulty: '中等',
        calories: 380,
        protein: 25,
        fat: 18,
        ingredients: ['五花肉 500g', '冰糖 30g', '生抽', '老抽', '料酒', '姜片', '八角', '葱段'],
        steps: [
          '五花肉切块，冷水下锅焯水去血沫，捞出沥干备用',
          '锅中放少许油，加冰糖小火炒至琥珀色起泡',
          '放入肉块翻炒上色，加生抽、老抽、料酒和姜片八角调味',
          '加入开水没过肉块，大火烧开后转小火炖40分钟，大火收汁撒葱段即可'
        ]
      },
      {
        id: 2,
        name: '西红柿炒蛋',
        description: '酸甜可口，营养均衡',
        price: 18,
        category: '荤菜',
        image: '/images/dish2.jpg',
        cookingTime: 15,
        difficulty: '简单',
        calories: 180,
        protein: 12,
        fat: 10,
        ingredients: ['鸡蛋 3个', '西红柿 2个', '葱花', '盐', '糖'],
        steps: [
          '鸡蛋打散加少许盐，西红柿切块备用',
          '热锅凉油，倒入蛋液炒至凝固盛出',
          '锅中放油，放入西红柿翻炒出汁',
          '加入鸡蛋翻炒均匀，加盐和糖调味，撒葱花出锅'
        ]
      },
      {
        id: 3,
        name: '清炒时蔬',
        description: '新鲜时令蔬菜，清淡健康',
        price: 15,
        category: '素菜',
        image: '',
        cookingTime: 10,
        difficulty: '简单',
        calories: 60,
        protein: 3,
        fat: 2,
        ingredients: ['时令蔬菜 300g', '蒜末', '盐'],
        steps: [
          '蔬菜洗净切段',
          '热锅凉油，爆香蒜末',
          '放入蔬菜大火快炒',
          '加盐调味即可出锅'
        ]
      },
      {
        id: 4,
        name: '酸辣汤',
        description: '酸辣开胃，暖身暖心',
        price: 22,
        category: '汤品',
        image: '',
        cookingTime: 20,
        difficulty: '中等',
        calories: 120,
        protein: 8,
        fat: 5,
        ingredients: ['豆腐', '木耳', '金针菇', '鸡蛋', '醋', '胡椒粉', '淀粉'],
        steps: [
          '豆腐切丝，木耳切丝，金针菇去根',
          '锅中加水烧开，放入豆腐木耳金针菇',
          '加入醋和胡椒粉调味',
          '淋入蛋液，加淀粉勾芡即可'
        ]
      },
      {
        id: 5,
        name: '蛋炒饭',
        description: '粒粒分明，香气四溢',
        price: 16,
        category: '主食',
        image: '',
        cookingTime: 10,
        difficulty: '简单',
        calories: 280,
        protein: 10,
        fat: 8,
        ingredients: ['米饭 1碗', '鸡蛋 2个', '葱花', '盐'],
        steps: [
          '米饭提前打散，鸡蛋打散',
          '热锅凉油，倒入蛋液炒散',
          '加入米饭大火快炒',
          '加盐调味，撒葱花出锅'
        ]
      },
      {
        id: 6,
        name: '芒果布丁',
        description: '香甜嫩滑，饭后甜品',
        price: 12,
        category: '甜品',
        image: '',
        cookingTime: 30,
        difficulty: '中等',
        calories: 150,
        protein: 3,
        fat: 4,
        ingredients: ['芒果 1个', '牛奶 200ml', '吉利丁片', '糖'],
        steps: [
          '芒果切块，吉利丁片泡软',
          '牛奶加热，加入吉利丁片搅拌至融化',
          '加入芒果块和糖，倒入模具',
          '放入冰箱冷藏2小时以上'
        ]
      }
    ],
    orders: [
      {
        id: '20250701001',
        dishes: [
          { name: '红烧肉', quantity: 2, price: 38 },
          { name: '西红柿炒蛋', quantity: 1, price: 18 },
          { name: '蛋炒饭', quantity: 1, price: 16 }
        ],
        total: 109,
        status: 'making',
        time: '12:30',
        date: '今天'
      },
      {
        id: '20250701002',
        dishes: [
          { name: '清炒时蔬', quantity: 1, price: 15 },
          { name: '酸辣汤', quantity: 1, price: 22 }
        ],
        total: 37,
        status: 'completed',
        time: '11:00',
        date: '今天'
      },
      {
        id: '20250630001',
        dishes: [
          { name: '红烧肉', quantity: 1, price: 38 },
          { name: '蛋炒饭', quantity: 2, price: 16 }
        ],
        total: 70,
        status: 'completed',
        time: '18:45',
        date: '昨天'
      },
      {
        id: '20250630002',
        dishes: [
          { name: '芒果布丁', quantity: 3, price: 12 }
        ],
        total: 36,
        status: 'pending',
        time: '17:20',
        date: '昨天'
      }
    ]
  },

  onLaunch() {
    // 初始化
  }
})
