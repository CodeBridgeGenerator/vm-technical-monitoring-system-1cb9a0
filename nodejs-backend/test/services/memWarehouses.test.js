const assert = require('assert');
const app = require('../../src/app');

describe('\'memWarehouses\' service', () => {
  it('registered the service', () => {
    const service = app.service('memWarehouses');

    assert.ok(service, 'Registered the service (memWarehouses)');
  });
});
