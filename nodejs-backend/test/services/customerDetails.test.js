const assert = require('assert');
const app = require('../../src/app');

describe('\'customerDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('customerDetails');

    assert.ok(service, 'Registered the service (customerDetails)');
  });
});
