const assert = require('assert');
const app = require('../../src/app');

describe('\'incomingMachineChecks\' service', () => {
  it('registered the service', () => {
    const service = app.service('incomingMachineChecks');

    assert.ok(service, 'Registered the service (incomingMachineChecks)');
  });
});
