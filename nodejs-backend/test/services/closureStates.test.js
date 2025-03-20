const assert = require('assert');
const app = require('../../src/app');

describe('\'closureStates\' service', () => {
  it('registered the service', () => {
    const service = app.service('closureStates');

    assert.ok(service, 'Registered the service (closureStates)');
  });
});
