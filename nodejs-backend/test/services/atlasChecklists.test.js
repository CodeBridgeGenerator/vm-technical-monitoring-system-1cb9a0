const assert = require('assert');
const app = require('../../src/app');

describe('\'atlasChecklists\' service', () => {
  it('registered the service', () => {
    const service = app.service('atlasChecklists');

    assert.ok(service, 'Registered the service (atlasChecklists)');
  });
});
