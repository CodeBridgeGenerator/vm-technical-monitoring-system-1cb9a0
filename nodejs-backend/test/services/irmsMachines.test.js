const assert = require('assert');
const app = require('../../src/app');

describe('\'irmsMachines\' service', () => {
  it('registered the service', () => {
    const service = app.service('irmsMachines');

    assert.ok(service, 'Registered the service (irmsMachines)');
  });
});
