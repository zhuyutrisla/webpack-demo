import Vue from 'vue'

var app = new Vue({
  el: '#app',
  data: {
    newTodo: '',
    todoList: []
  },
  created: function(){
    window.onbeforeunload = ()=>{
      let dataString = JSON.stringify(this.todoList)
      window.localStorage.setItem('myTodos', dataString)

      let dataInput = JSON.stringify(this.newTodo)
      window.localStorage.setItem('myInput', dataInput)      
    }

    let oldDateString = window.localStorage.getItem('myTodos')
    let oldData = JSON.parse(oldDateString)
    this.todoList = oldData || []

    let oldDataInput = window.localStorage.getItem('myInput')
    let oldInput = JSON.parse(oldDataInput)
    this.newTodo = oldInput || ""
  },
  methods: {
    addTodo: function(){
      this.todoList.push({
        title: this.newTodo,
        createAt: new Date(),
        done: false
      })
      this.newTodo=""
    },
    removeTodo: function(todo){
      let index = this.todoList.indexOf(todo)
      this.todoList.splice(index,1)
    }
  }
})


