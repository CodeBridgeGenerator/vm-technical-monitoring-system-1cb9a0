const assert = require('assert');
const app = require('../../src/app');

describe('\'customerSalesOrders\' service', () => {
  it('registered the service', () => {
    const service = app.service('customerSalesOrders');

    assert.ok(service, 'Registered the service (customerSalesOrders)');
  });
});
