const assert = require('assert');
const app = require('../../src/app');

describe('\'memMachines\' service', () => {
  it('registered the service', () => {
    const service = app.service('memMachines');

    assert.ok(service, 'Registered the service (memMachines)');
  });
});
