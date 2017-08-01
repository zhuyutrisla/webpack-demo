import Vue from 'vue'
import AV from 'leancloud-storage'

var APP_ID = '0xYwv4z0cwMgnC6d1xRTR54L-gzGzoHsz';
var APP_KEY = 'CKWGhIijwdlOqpPUR9102gYC';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//   words: 'Hello World!'
// }).then(function(object) {
//   alert('LeanCloud Rocks!');
// })

var app = new Vue({
  el: '#app',
  data: {
    actionType: 'signUp',
    formData:{
      username: '',
      password: ''
    },
    newTodo: '',
    todoList: [],
    currentUser: null
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
    this.currentUser = this.getCurrentUser();
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
    },
    signUp: function(){
      let user = new AV.User();
      user.setUsername(this.formData.username)
      user.setPassword(this.formData.password);
      user.signUp().then((loginedUser) => {
        this.currentUser = this.getCurrentUser()
      }, function(error) {
        alert('注册失败')
      });
    },
    login: function() {
      AV.User.logIn(this.formData.username, this.formData.password).then((loginedUser) =>{
        this.currentUser = this.getCurrentUser()
      }, function (error) {
        alert('登陆失败')
      });
    },
    getCurrentUser: function(){
      // let {id, createAt, attributes: {username}} = AV.User.current()
      // return {id, username, createAt}
      let current = AV.User.current()
      if (current){
        let {id, createAt, attributes: {username}} = AV.User.current()
        return {id, username, createAt}
      }else{
        return null
      }
    },
    logout: function(){
      AV.User.logOut()
      this.currentUser = null
      window.location.reload()   //页面刷新
    }
  }  
})


