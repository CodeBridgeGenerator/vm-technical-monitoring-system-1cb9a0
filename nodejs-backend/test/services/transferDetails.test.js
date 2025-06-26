const assert = require('assert');
const app = require('../../src/app');

describe('\'transferDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('transferDetails');

    assert.ok(service, 'Registered the service (transferDetails)');
  });
});
