const assert = require('assert');
const app = require('../../src/app');

describe('\'partsMaster\' service', () => {
  it('registered the service', () => {
    const service = app.service('partsMaster');

    assert.ok(service, 'Registered the service (partsMaster)');
  });
});
