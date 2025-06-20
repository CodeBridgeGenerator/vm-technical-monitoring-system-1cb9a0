const assert = require('assert');
const app = require('../../src/app');

describe('\'memParts\' service', () => {
  it('registered the service', () => {
    const service = app.service('memParts');

    assert.ok(service, 'Registered the service (memParts)');
  });
});
