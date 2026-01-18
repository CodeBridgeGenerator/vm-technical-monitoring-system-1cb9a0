const assert = require('assert');
const app = require('../../src/app');

describe('\'quotationDeliveryDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('quotationDeliveryDetails');

    assert.ok(service, 'Registered the service (quotationDeliveryDetails)');
  });
});
