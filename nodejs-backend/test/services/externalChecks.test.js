const assert = require('assert');
const app = require('../../src/app');

describe('\'externalChecks\' service', () => {
  it('registered the service', () => {
    const service = app.service('externalChecks');

    assert.ok(service, 'Registered the service (externalChecks)');
  });
});
