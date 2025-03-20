const assert = require('assert');
const app = require('../../src/app');

describe('\'sampleDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('sampleDetails');

    assert.ok(service, 'Registered the service (sampleDetails)');
  });
});
