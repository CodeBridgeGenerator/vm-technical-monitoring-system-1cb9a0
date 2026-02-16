const assert = require('assert');
const app = require('../../src/app');

describe('\'partsMasterRaw\' service', () => {
  it('registered the service', () => {
    const service = app.service('partsMasterRaw');

    assert.ok(service, 'Registered the service (partsMasterRaw)');
  });
});
