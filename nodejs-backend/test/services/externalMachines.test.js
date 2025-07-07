const assert = require('assert');
const app = require('../../src/app');

describe('\'externalMachines\' service', () => {
  it('registered the service', () => {
    const service = app.service('externalMachines');

    assert.ok(service, 'Registered the service (externalMachines)');
  });
});
