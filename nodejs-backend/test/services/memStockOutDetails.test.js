const assert = require('assert');
const app = require('../../src/app');

describe('\'memStockOutDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('memStockOutDetails');

    assert.ok(service, 'Registered the service (memStockOutDetails)');
  });
});
