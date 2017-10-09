var request = require('supertest');
var app = require('./app');
var redis = require('redis');
var client = redis.createClient();
client.select('test'.length);
client.flushdb();
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
		.expect(JSON.stringify([]), done);
	});
});

describe('Creating new cities', function(){
	before(function(){

	});
	it('Returns 201 status code', function(done){
		request(app)
		.post('/cities')
		.send('name=Amaravathi&description=Capital+Of+Andhra+Pradesh')
		.expect(201, done);
	})
	it('Returns the city name', function(done){
		request(app)
		.post('/cities')
		.send('name=Amaravathi&description=Capital+Of+Andhra+Pradesh')
		.expect(/amaravathi/i, done);
	});
})