const assert = require('assert');
const app = require('../../src/app');

describe('\'memStockInDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('memStockInDetails');

    assert.ok(service, 'Registered the service (memStockInDetails)');
  });
});
