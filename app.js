/**
 * Module dependencies.
 */
var mongoose = require('mongoose')
var logger = require('koa-logger')
var router = require('koa-router')
var views = require('co-views')
var parser = require('koa-body-parser')
var serve = require('koa-static')
var koa = require('koa')
var app = koa()
 
// "data store"
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cocktailroulette');
 
var guests = require('./routes/guests')

// middleware


app.use(serve('./client/'));
app.use(serve('./public/'));
app.use(serve('./bower_components/'));

app.use(parser())
app.use(logger())

app.use(router(app));
 
// route middleware
app.get('/', cocktail)
app.get('/guests', guests.getAll)
app.post('/guests', guests.save)


 
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
 
// http server listening
app.listen(3000)
console.log('listening on port 3000')