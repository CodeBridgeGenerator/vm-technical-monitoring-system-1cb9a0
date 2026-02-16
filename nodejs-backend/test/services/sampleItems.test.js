const assert = require('assert');
const app = require('../../src/app');

describe('\'sampleItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('sampleItems');

    assert.ok(service, 'Registered the service (sampleItems)');
  });
});
