const assert = require('assert');
const app = require('../../src/app');

describe('\'memWarehouseParts\' service', () => {
  it('registered the service', () => {
    const service = app.service('memWarehouseParts');

    assert.ok(service, 'Registered the service (memWarehouseParts)');
  });
});
