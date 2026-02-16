const assert = require('assert');
const app = require('../../src/app');

describe('\'incomingMachineChecklists\' service', () => {
  it('registered the service', () => {
    const service = app.service('incomingMachineChecklists');

    assert.ok(service, 'Registered the service (incomingMachineChecklists)');
  });
});
