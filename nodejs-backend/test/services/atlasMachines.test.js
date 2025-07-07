const assert = require('assert');
const app = require('../../src/app');

describe('\'atlasMachines\' service', () => {
  it('registered the service', () => {
    const service = app.service('atlasMachines');

    assert.ok(service, 'Registered the service (atlasMachines)');
  });
});
