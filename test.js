var request = require('supertest');
var app = require('./app');
var format = require('string-format');
var redis = require('redis');
var client = redis.createClient();
client.select((process.env.NODE_ENV || 'development').length);
client.flushdb();

describe('Request to the root path', function () {
	// before(function () {
	// 	console.log('\n' + new Date().toISOString() + ' ************************************************\n');
	// });
	it('Returns a 200 status code', function (done) {
		request(app)
			.get('/')
			.expect(200)
			.end(function (error) {
				if (error) throw error;
				done();
			});
	});

	it('Returns a HTML format', function (done) {
		request(app)
			.get('/')
			.expect('Content-Type', /html/, done);
	});

	it('Returns an index file with cities', function (done) {
		request(app)
			.get('/')
			.expect(/cities/i, done);
	})
});

describe('Listing cities on /cities', function () {
	it('Return 200 status code', function (done) {
		request(app)
			.get('/cities')
			.expect(200, done);
	});
	it('Returns JSON Format', function (done) {
		request(app)
			.get('/cities')
			// .expect('Content-Type', 'application/json; charset=utf-8', done);
			.expect('Content-Type', /json/, done);
	});
	it('Return initial cities', function (done) {
		request(app)
			.get('/cities')
			.expect(JSON.stringify([]), done);
	});
});

describe('Creating new cities', function () {
	it('Returns 201 status code', function (done) {
		request(app)
			.post('/cities')
			.send('name=Amaravathi&description=Capital+Of+Andhra+Pradesh')
			.expect(201, done);
	})
	it('Returns the city name', function (done) {
		request(app)
			.post('/cities')
			.send('name=Amaravathi&description=Capital+Of+Andhra+Pradesh')
			.expect(/amaravathi/i, done);
	});
	it('Validates city name and description', function(done){
		request(app)
			.post('/cities')
			.send('name=&description=')
			.expect(400, done);
	});
	// after(function () {
	// 	console.log('\n' + new Date().toISOString() + ' ************************************************');
	// });
});

describe('Deleting cities', function () {
	before(function () {
		client.hset('cities', 'Chennai', 'Capital of Tamil Nadu.');
	});

	it('Returns a 204 status code', function (done) {
		request(app)
			.delete('/cities/Chennai')
			.expect(204, done);
	});
	
	after(function () {
		client.flushdb();
	})
});

describe('Show city information', function(){
	before(function(){
		client.hset('cities', 'Mumbai', 'Capital of Maharastra');
	});

	it('Returns 200 status code', function(done){
		request(app)
		.get('/cities/Mumbai')
		.expect(200, done);
	});

	it('Returns HTML format', function(done){
		request(app)
		.get('/cities/Mumbai')
		.expect('Content-Type', /html/, done);
	});

	it('Returns information for given city', function(done){
		request(app)
			.get('/cities/Mumbai')
			.expect(/Maharastra/, done);
	});

	after(function(){
		client.flushdb();
	})
});