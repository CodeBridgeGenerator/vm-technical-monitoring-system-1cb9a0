const assert = require('assert');
const app = require('../../src/app');

describe('\'deliveryOrderItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('deliveryOrderItems');

    assert.ok(service, 'Registered the service (deliveryOrderItems)');
  });
});
