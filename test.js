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

	it('Returns a HTML format', function(done){
		request(app)
		.get('/')
		.expect('Content-Type', /html/, done); 
	});

	it('Returns an index file with cities', function(done){
		request(app)
		.get('/')
		.expect(/cities/i, done);
	})
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
		// .expect('Content-Type', 'application/json; charset=utf-8', done);
		.expect('Content-Type', /json/, done);
	});
	it('Return initial cities', function(done){
		request(app)
		.get('/cities')
		.expect(JSON.stringify(['Hyderabad','Bangalore','Chennai']), done);
	});
});	