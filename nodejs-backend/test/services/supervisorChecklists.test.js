const assert = require('assert');
const app = require('../../src/app');

describe('\'supervisorChecklists\' service', () => {
  it('registered the service', () => {
    const service = app.service('supervisorChecklists');

    assert.ok(service, 'Registered the service (supervisorChecklists)');
  });
});
