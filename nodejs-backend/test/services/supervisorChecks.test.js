const assert = require('assert');
const app = require('../../src/app');

describe('\'supervisorChecks\' service', () => {
  it('registered the service', () => {
    const service = app.service('supervisorChecks');

    assert.ok(service, 'Registered the service (supervisorChecks)');
  });
});
