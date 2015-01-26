var Q = require('q'),
	mongoose = require('mongoose')

var guestSchema = mongoose.Schema({
    name: String
})

var Guest = mongoose.model('Guest', guestSchema)

exports.getAll = function* getAll() {
	var deferred = Q.defer();

	var self = this
	Guest.find({}, function(err, guests){
		deferred.resolve(guests)
	})
    
    self.body = yield deferred.promise
}

exports.save = function* save(){
	var deferred = Q.defer();

	var form = this.request.body;

	var newGuest = new Guest({
		name: form.name
	})

	newGuest.save(function(err, thGestu){
		deferred.resolve(form)
	})

	this.body = yield deferred.promise
}