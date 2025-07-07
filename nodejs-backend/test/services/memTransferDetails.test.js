const assert = require('assert');
const app = require('../../src/app');

describe('\'memTransferDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('memTransferDetails');

    assert.ok(service, 'Registered the service (memTransferDetails)');
  });
});
