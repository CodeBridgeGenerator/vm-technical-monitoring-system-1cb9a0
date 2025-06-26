const assert = require('assert');
const app = require('../../src/app');

describe('\'etikaTickets\' service', () => {
  it('registered the service', () => {
    const service = app.service('etikaTickets');

    assert.ok(service, 'Registered the service (etikaTickets)');
  });
});
