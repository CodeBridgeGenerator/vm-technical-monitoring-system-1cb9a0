const assert = require('assert');
const app = require('../../src/app');

describe('\'externalChecklists\' service', () => {
  it('registered the service', () => {
    const service = app.service('externalChecklists');

    assert.ok(service, 'Registered the service (externalChecklists)');
  });
});
