/**
 * Module dependencies.
 */
var logger = require('koa-logger')
var route = require('koa-route')
var views = require('co-views')
var parse = require('co-body')
var serve = require('koa-static')
var koa = require('koa')
var app = koa()
 
// "data store"
var todos = [] //To Do : DB change to MongoDB
 
var guests = require('./routes/guests')

// middleware


app.use(serve('./client/'));
app.use(serve('./bower_components/'));

app.use(logger())
 
// route middleware
app.use(route.get('/', cocktail))
app.use(route.get('/guests', guests.getAll))


 
//Specifying Swig view engine
var render= views(__dirname + '/views',
 { map: { html: 'swig' }})
 
// route definitions
 
/**
 * Todo item List.
 */
function *cocktail() {
  this.body = yield render('index')
}
 
// /**
//  * Form for create new todo item.
//  */
// function *add() {
//   this.body = yield render('new')
// }
 
// /**
//  * Form for edit a todo items.
//  */
// function *edit(id) {
//     var todo = todos[id]
//     if (!todo) this.throw(404, 'invalid todo id')
//     this.body = yield render('edit', { todo: todo })
// }
 
// /**
//  * Show details of a todo item.
//  */
 
// function *show(id) {
//   var todo = todos[id]
//   if (!todo) this.throw(404, 'invalid todo id')
//   this.body = yield render('show', { todo: todo })
// }
 
// /**
//  * Delete a todo item
//  */
// function *remove(id) {
//     var todo = todos[id]
//     if (!todo) this.throw(404, 'invalid todo id')
//    todos.splice(id,1)
//     //Changing the Id for working with index
//     for (var i = 0 i < todos.length i++)
//     {
//         todos[i].id=i
//     }
//     this.redirect('/')
// }
 
// /**
//  * Create a todo item into the data store.
//  */
// function *create() {
//   var todo = yield parse(this)
//   todo.created_on = new Date
//   todo.updated_on = new Date
//   var id = todos.push(todo)
//   todo.id = id-1//Id with index of the array
//   this.redirect('/')
// }
 
// /**
//  * Update an existing todo item.
//  */
// function *update() {
//     var todo = yield parse(this)
//     var index=todo.id
//     todos[index].name=todo.name
//     todos[index].description=todo.description
//     todos[index].updated_on = new Date
//     this.redirect('/')
// }
 
// http server listening
app.listen(3000)
console.log('listening on port 3000')