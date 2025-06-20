const assert = require('assert');
const app = require('../../src/app');

describe('\'stockInDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('stockInDetails');

    assert.ok(service, 'Registered the service (stockInDetails)');
  });
});
