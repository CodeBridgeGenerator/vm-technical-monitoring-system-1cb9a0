const assert = require('assert');
const app = require('../../src/app');

describe('\'locationMaster\' service', () => {
  it('registered the service', () => {
    const service = app.service('locationMaster');

    assert.ok(service, 'Registered the service (locationMaster)');
  });
});
