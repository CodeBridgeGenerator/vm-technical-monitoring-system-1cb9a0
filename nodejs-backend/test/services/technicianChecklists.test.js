const assert = require('assert');
const app = require('../../src/app');

describe('\'technicianChecklists\' service', () => {
  it('registered the service', () => {
    const service = app.service('technicianChecklists');

    assert.ok(service, 'Registered the service (technicianChecklists)');
  });
});
