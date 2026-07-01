const app = getApp()

Page({
  data: {
    formData: {
      name: '',
      category: '',
      price: '',
      image: '',
      ingredients: '',
      cookingTime: '',
      difficulty: '简单',
      description: '',
      steps: ['', '']
    },
    categories: ['荤菜', '素菜', '汤品', '主食', '甜品'],
    difficulties: ['简单', '中等', '困难'],
    safeAreaBottom: 34
  },

  onLoad() {
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      safeAreaBottom: systemInfo.safeArea.bottom - systemInfo.safeArea.height
    })
  },

  onBack() {
    wx.navigateBack()
  },

  onChooseImage() {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera'],
      success: (res) => {
        this.setData({
          'formData.image': res.tempFilePaths[0]
        })
      }
    })
  },

  onNameInput(e) {
    this.setData({
      'formData.name': e.detail.value
    })
  },

  onPriceInput(e) {
    this.setData({
      'formData.price': e.detail.value
    })
  },

  onIngredientsInput(e) {
    this.setData({
      'formData.ingredients': e.detail.value
    })
  },

  onTimeInput(e) {
    this.setData({
      'formData.cookingTime': e.detail.value
    })
  },

  onDescInput(e) {
    this.setData({
      'formData.description': e.detail.value
    })
  },

  onStepInput(e) {
    const index = e.currentTarget.dataset.index
    const steps = this.data.formData.steps
    steps[index] = e.detail.value
    this.setData({
      'formData.steps': steps
    })
  },

  onChooseCategory() {
    wx.showActionSheet({
      itemList: this.data.categories,
      success: (res) => {
        this.setData({
          'formData.category': this.data.categories[res.tapIndex]
        })
      }
    })
  },

  onChooseDifficulty() {
    wx.showActionSheet({
      itemList: this.data.difficulties,
      success: (res) => {
        this.setData({
          'formData.difficulty': this.data.difficulties[res.tapIndex]
        })
      }
    })
  },

  onAddStep() {
    const steps = this.data.formData.steps
    steps.push('')
    this.setData({
      'formData.steps': steps
    })
  },

  onDeleteStep(e) {
    const index = e.currentTarget.dataset.index
    const steps = this.data.formData.steps
    if (steps.length > 1) {
      steps.splice(index, 1)
      this.setData({
        'formData.steps': steps
      })
    }
  },

  onSave() {
    const { formData } = this.data

    if (!formData.name) {
      wx.showToast({ title: '请输入菜品名称', icon: 'none' })
      return
    }
    if (!formData.category) {
      wx.showToast({ title: '请选择菜品分类', icon: 'none' })
      return
    }
    if (!formData.price) {
      wx.showToast({ title: '请输入价格', icon: 'none' })
      return
    }

    const ingredientsList = formData.ingredients
      ? formData.ingredients.split(/[,，]/).map(s => s.trim()).filter(s => s)
      : []

    const stepsList = formData.steps.filter(s => s.trim())

    const newDish = {
      id: Date.now(),
      name: formData.name,
      description: formData.description || '',
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image,
      cookingTime: parseInt(formData.cookingTime) || 30,
      difficulty: formData.difficulty,
      calories: 0,
      protein: 0,
      fat: 0,
      ingredients: ingredientsList,
      steps: stepsList
    }

    app.globalData.dishList.unshift(newDish)

    wx.showToast({
      title: '保存成功',
      icon: 'success',
      duration: 1500
    })

    setTimeout(() => {
      wx.navigateBack()
    }, 1500)
  }
})
