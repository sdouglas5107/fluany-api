var should = require('should'); 
var assert = require('assert');
var request = require('supertest');

var url = 'localhost:3000';

describe('Phrases', function(){
	request(url)
		.get('/api/eng/readphrases')
	   // end handles the response
		.end(function(err, res) {
      if (err) {
        throw err;
      }
      // this is should.js syntax, very clear ;ˆ;
      res.should.have.status(400);
      done();
    });
})