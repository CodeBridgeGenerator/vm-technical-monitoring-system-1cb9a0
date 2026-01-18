const assert = require('assert');
const app = require('../../src/app');

describe('\'irmsWarehouseParts\' service', () => {
  it('registered the service', () => {
    const service = app.service('irmsWarehouseParts');

    assert.ok(service, 'Registered the service (irmsWarehouseParts)');
  });
});
