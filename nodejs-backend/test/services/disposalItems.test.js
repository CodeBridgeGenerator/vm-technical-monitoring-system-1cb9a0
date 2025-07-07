const assert = require('assert');
const app = require('../../src/app');

describe('\'disposalItems\' service', () => {
  it('registered the service', () => {
    const service = app.service('disposalItems');

    assert.ok(service, 'Registered the service (disposalItems)');
  });
});
