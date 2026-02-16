const assert = require('assert');
const app = require('../../src/app');

describe('\'externalTickets\' service', () => {
  it('registered the service', () => {
    const service = app.service('externalTickets');

    assert.ok(service, 'Registered the service (externalTickets)');
  });
});
