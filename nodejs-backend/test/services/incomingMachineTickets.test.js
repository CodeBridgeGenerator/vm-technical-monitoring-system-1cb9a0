const assert = require('assert');
const app = require('../../src/app');

describe('\'incomingMachineTickets\' service', () => {
  it('registered the service', () => {
    const service = app.service('incomingMachineTickets');

    assert.ok(service, 'Registered the service (incomingMachineTickets)');
  });
});
