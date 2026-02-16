const assert = require('assert');
const app = require('../../src/app');

describe('\'technicianChecks\' service', () => {
  it('registered the service', () => {
    const service = app.service('technicianChecks');

    assert.ok(service, 'Registered the service (technicianChecks)');
  });
});
