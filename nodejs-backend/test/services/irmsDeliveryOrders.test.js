const assert = require('assert');
const app = require('../../src/app');

describe('\'irmsDeliveryOrders\' service', () => {
  it('registered the service', () => {
    const service = app.service('irmsDeliveryOrders');

    assert.ok(service, 'Registered the service (irmsDeliveryOrders)');
  });
});
