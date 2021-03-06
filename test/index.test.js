var test     = require('tape');
var lp = require('../lib/index').profile;
var company = require('../lib/index').company;


test('Force url error by not setting a url', function(t){
	var url;
	lp(url, function(err, data){
    t.ok(err === 'url undefined', 'Instant 404 Error when url not set');
	  t.ok(data.url === undefined, 'Url is undefined when it is not set');
		t.end();
	})
})

test('Force 404 error by supplying a mal-formed url', function(t){
	var url = 'https://uk.linkedin.com/in/simonlabondwrong';
	lp(url, function(err, data){
    t.ok(parseInt(err.message) === 404, 'Instant 404 Error when url not set');
	  t.ok(data.url === 'https://uk.linkedin.com/in/simonlabondwrong', 'Return the mal-formed url');
		t.end();
	})
})

test('Return an error if something wrong happen while parsing profile', function (t) {

	var url = 'https://uk.linkedin.com/in/simonlabond';
	var nock = require('nock');
	var scope = nock('https://uk.linkedin.com')
						.get('/in/simonlabond')
						.reply(403,'something awful happened');
	lp(url, function(err, data){
    t.ok(err.message === 'error fetcher', 'Return error fetcher');
		t.end();
	})
})

test('Return an error if something wrong happen while parsing company', function (t) {

	var url = 'https://www.linkedin.com/compan/apple';
	var nock = require('nock');
	var scope = nock('https://www.linkedin.com')
		.get('/compan/apple')
		.reply(403, 'something awful happened');
	company(url, function (err, data) {
		t.ok(err.message === 'error fetcher', 'Return error fetcher');
		t.end();
	})
})

var fs = require('fs');
var emusk = fs.readFileSync('./test/fixtures/emusk.html');
var nock = require('nock');
nock('https://www.linkedin.com')
  .get('/in/emusk')
  .reply(200, emusk);

test('Successfully Parse Elon\'s Public LinkedIn Profile Page ', function(t){
	var url = 'https://www.linkedin.com/in/emusk';
	lp(url, function(err, data){
	// console.log('##########', err);
    t.ok(err === null, 'No error when viewing Elon\'s Profile');
		t.end();
	})
})

fs = require('fs');
var apple = fs.readFileSync('./test/fixtures/apple.html');
nock = require('nock');
nock('https://www.linkedin.com')
	.get('/company/apple')
	.reply(200, emusk);

test('Successfully Parse Apple\'s LinkedIn Company page ', function (t) {
	var url = 'https://www.linkedin.com/company/apple';
	company(url, function (err, data) {
		// console.log('##########', err);
		t.ok(err === null, 'No error when viewing Apple\'s Company page');
		t.end();
	})
})
