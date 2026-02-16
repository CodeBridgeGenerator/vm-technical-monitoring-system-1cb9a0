const assert = require('assert');
const app = require('../../src/app');

describe('\'customerPurchaseOrders\' service', () => {
  it('registered the service', () => {
    const service = app.service('customerPurchaseOrders');

    assert.ok(service, 'Registered the service (customerPurchaseOrders)');
  });
});
