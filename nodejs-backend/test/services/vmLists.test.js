const assert = require('assert');
const app = require('../../src/app');

describe('\'vmLists\' service', () => {
  it('registered the service', () => {
    const service = app.service('vmLists');

    assert.ok(service, 'Registered the service (vmLists)');
  });
});
