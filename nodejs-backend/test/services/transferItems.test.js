const assert = require('assert');
const app = require('../../src/app');

describe('\'transferItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('transferItems');

    assert.ok(service, 'Registered the service (transferItems)');
  });
});
