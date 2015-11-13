/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	logger = require('koa-logger'),
	router = require('koa-router'),
	views = require('co-views'),
	parser = require('koa-body-parser'),
	serve = require('koa-static'),
	koa = require('koa'),
	mount = require('koa-mount'),
	app = koa(),
	r;
 
// Database
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/cocktailroulette');
 
var guests = require('./routes/guests');

// middleware
app.use(serve('./client/'));
app.use(serve('./public/'));
app.use(serve('./bower_components/'));
app.use(parser());
app.use(logger());

r = router(app);

app.use(mount('/', r.middleware()));
 
// route middleware
r.get('/', cocktail);
r.get('/guests', guests.getAll);
r.post('/guests', guests.save);


 
//Specifying Swig view engine
var render= views(__dirname + '/views', { map: { html: 'swig' }});
 
// route definitions
 
/**
 * Todo item List.
 */
function *cocktail() {
  this.body = yield render('index')
}
 
// http server listening
app.listen(3000);
console.log('listening on port 3000');