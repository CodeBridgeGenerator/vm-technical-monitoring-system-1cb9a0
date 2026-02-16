const assert = require('assert');
const app = require('../../src/app');

describe('\'miscellaneousCharges\' service', () => {
  it('registered the service', () => {
    const service = app.service('miscellaneousCharges');

    assert.ok(service, 'Registered the service (miscellaneousCharges)');
  });
});
