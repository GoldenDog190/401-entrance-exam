'use strict';

const request = require('supertest');
/*
-------------------------------------------------------------------
Build a simple express server.
  - Connect a '/hello' route that sends a greeting of your  choice.
  - Connect a '/aboutme' route that sends a short bio about you to the front-end.
  - Connect a '/favoritefoods' route that sends an array containing your favorite foods.
  - All other routes should respond with a status of 404.

NOTE: You do not need write the app.listen() code for your server
      The test do this for you
-------------------------------------------------------------------
*/

const createServer = () => {
  const express = require('express');
  const app = express();

  // Solution code here...
  app.get('/hello', greeting);
  app.get('/aboutme', aboutMe);
  app.get('/favoritefoods', favoriteFood);

  function greeting(request, response) {
    response.send('Hi, nice to meet you!');
  }

  function aboutMe(request, response) {
    response.send('I am Amelia Waggoner, and I am a software engineer from the Pacific Northwest.');
  }

  function favoriteFood(request, response) {
   let arrFood = ['sushi', 'pizza', 'mac & cheese']; 
   response.send(arrFood);
  }
  return app;
};


///////////////////////////////////////////////////
// TESTS
///////////////////////////////////////////////////

describe('Testing challenge', () => {

  let server = createServer();

  it('responds to /hello', function testSlash() {
    return request(server)
      .get('/hello')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toBeDefined();
      })
  });

  it('responds to /aboutme', function testAbout() {
    return request(server)
      .get('/aboutme')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.text).toBeDefined();
      })
  });

  it('responds to /favoritefoods', function testFood() {
    return request(server)
      .get('/favoritefoods')
      .then(response => {
        expect(response.status).toEqual(200);
        expect(response.body.length).toBeGreaterThan(1);
      })
  });

  test('responds to /foo', function testNotFound() {
    return request(server)
      .get('/foo')
      .then(response => {
        expect(response.status).toEqual(404);
      })
  });
});
