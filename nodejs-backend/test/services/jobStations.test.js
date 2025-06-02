const assert = require('assert');
const app = require('../../src/app');

describe('\'jobStations\' service', () => {
  it('registered the service', () => {
    const service = app.service('jobStations');

    assert.ok(service, 'Registered the service (jobStations)');
  });
});
