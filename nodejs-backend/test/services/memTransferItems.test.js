const assert = require('assert');
const app = require('../../src/app');

describe('\'memTransferItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('memTransferItems');

    assert.ok(service, 'Registered the service (memTransferItems)');
  });
});
