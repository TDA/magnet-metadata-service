'use strict';

/**
 * Dependencies
 */

const app = require('../../../lib/routes/api');
const assert = require('chai').assert;
const request = require('supertest');

var playSite = {
  objects: [
    {
      url: 'https://play.google.com/store/apps/details?id=org.mozilla.firefox'
    }
  ]
};

describe('Google Play parser', () => {
  it('should get store information', (done) => {
    request(app)
      .post('/metadata/')
      .send(playSite)
      .expect(200)
      .end((err, response) => {
        assert.isNull(err);

        var result = JSON.parse(response.text);
        assert.lengthOf(result, 1);

        result = result[0];
        assert.ok(result.android);

        ['id', 'name', 'package', 'icon', 'rating'].forEach((field) => {
          assert.isNotNull(result.android[field]);
        });

        done();
      });
  });
});