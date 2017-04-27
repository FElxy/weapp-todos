const STORAGE_KEY = "todos"
let storageTodos = {
  get() {
    let todos = JSON.parse(wx.getStorageSync(STORAGE_KEY) || '[]')
    todos.forEach((item, index) => {
      item.id = index
    })
    return todos
  },
  set(todos) {
    wx.setStorageSync(STORAGE_KEY, JSON.stringify(todos))
  }
}
let isCheckAll = (arr) => {
  if (arr.length == 0) {
    return false
  }
  let val = arr.every((item, index) => {
    return item.done
  })
  return val
}
Page({
  data: {
    todos: storageTodos.get(),
    newTodo: '',
    isCheckAll: isCheckAll(storageTodos.get())
  },
  addTodo(e) {
    let val = e.detail.value.trim()
    if (!val) {
      return;
    }
    let todos = this.data.todos
    let len = todos.length

    todos.push({
      id: len++,
      msg: val,
      done: false
    })
    
    this.setData({
      todos: todos,
      newTodo: '',
      isCheckAll: isCheckAll(todos)
    })
    storageTodos.set(todos)
  },
  checkAll() {
    let todos = this.data.todos
    if (todos.length == 0) { return }
    let isCheck = !this.data.isCheckAll
    todos.forEach((item, index) => {
      item.done = isCheck
    })
    this.setData({
      todos: todos,
      isCheckAll: isCheck
    })
    storageTodos.set(todos)
  },
  checkboxChange(e) {
    let id = e.target.dataset.itemid
    let todos = this.data.todos
    todos.forEach((item, index) => {
      if (item.id == id) {
        item.done = !item.done
        this.setData({
          todos: todos
        })
        storageTodos.set(todos)
        return
      }
    })
    this.setData({
      isCheckAll: isCheckAll(todos)
    })
  },
  clearTodo() {
    let todos = this.data.todos.filter((item, index) => {
      if (!item.done) {
        return item
      }
    })
    this.setData({
      todos: todos,
      isCheckAll: isCheckAll(todos)
    })
    storageTodos.set(todos)
  },
  onLoad() {
    console.log('onLoad')
  }
})