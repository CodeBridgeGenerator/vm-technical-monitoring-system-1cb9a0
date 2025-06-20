const assert = require('assert');
const app = require('../../src/app');

describe('\'partRequestDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('partRequestDetails');

    assert.ok(service, 'Registered the service (partRequestDetails)');
  });
});
