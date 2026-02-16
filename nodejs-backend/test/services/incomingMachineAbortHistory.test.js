const assert = require('assert');
const app = require('../../src/app');

describe('\'incomingMachineAbortHistory\' service', () => {
  it('registered the service', () => {
    const service = app.service('incomingMachineAbortHistory');

    assert.ok(service, 'Registered the service (incomingMachineAbortHistory)');
  });
});
