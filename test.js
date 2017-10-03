var request = require('supertest');
var app = require('./app');

describe('Request to the root path', function(){
	it('Returns a 200 status code', function(done){
		request(app)
			.get('/')
			.expect(200)
			.end(function (error) {
				if (error) throw error;
				done();
			});
	});
});

describe('Listing cities on /cities', function(){
	it('Return 200 status code', function(done){
		request(app)
		.get('/cities')
		.expect(200, done);
	});
	it('Returns JSON Format', function(done){
		request(app)
		.get('/cities')
		.expect('Content-Type', 'application/json; charset=utf-8', done);
	})
});	