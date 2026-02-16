const assert = require('assert');
const app = require('../../src/app');

describe('\'atlasTickets\' service', () => {
  it('registered the service', () => {
    const service = app.service('atlasTickets');

    assert.ok(service, 'Registered the service (atlasTickets)');
  });
});
