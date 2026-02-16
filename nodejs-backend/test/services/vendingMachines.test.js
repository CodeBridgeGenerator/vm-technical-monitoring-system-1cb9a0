const assert = require('assert');
const app = require('../../src/app');

describe('\'vendingMachines\' service', () => {
  it('registered the service', () => {
    const service = app.service('vendingMachines');

    assert.ok(service, 'Registered the service (vendingMachines)');
  });
});
