var Q = require('q');

exports.getAll = function (req, res) {

    return Q.resolve([{
    	name: 'fred the man'
    }])
};
