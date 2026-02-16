const assert = require('assert');
const app = require('../../src/app');

describe('\'stockOutDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('stockOutDetails');

    assert.ok(service, 'Registered the service (stockOutDetails)');
  });
});
