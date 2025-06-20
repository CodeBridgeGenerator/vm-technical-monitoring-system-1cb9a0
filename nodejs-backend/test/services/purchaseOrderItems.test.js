const assert = require('assert');
const app = require('../../src/app');

describe('\'purchaseOrderItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('purchaseOrderItems');

    assert.ok(service, 'Registered the service (purchaseOrderItems)');
  });
});
