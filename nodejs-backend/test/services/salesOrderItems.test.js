const assert = require('assert');
const app = require('../../src/app');

describe('\'salesOrderItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('salesOrderItems');

    assert.ok(service, 'Registered the service (salesOrderItems)');
  });
});
