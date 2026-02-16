const assert = require('assert');
const app = require('../../src/app');

describe('\'irmsParts\' service', () => {
  it('registered the service', () => {
    const service = app.service('irmsParts');

    assert.ok(service, 'Registered the service (irmsParts)');
  });
});
