const assert = require('assert');
const app = require('../../src/app');

describe('\'atlasChecks\' service', () => {
  it('registered the service', () => {
    const service = app.service('atlasChecks');

    assert.ok(service, 'Registered the service (atlasChecks)');
  });
});
