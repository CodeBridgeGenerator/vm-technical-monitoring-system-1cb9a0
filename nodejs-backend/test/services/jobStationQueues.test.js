const assert = require('assert');
const app = require('../../src/app');

describe('\'jobStationQueues\' service', () => {
  it('registered the service', () => {
    const service = app.service('jobStationQueues');

    assert.ok(service, 'Registered the service (jobStationQueues)');
  });
});
