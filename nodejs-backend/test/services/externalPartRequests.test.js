const assert = require('assert');
const app = require('../../src/app');

describe('\'externalPartRequests\' service', () => {
  it('registered the service', () => {
    const service = app.service('externalPartRequests');

    assert.ok(service, 'Registered the service (externalPartRequests)');
  });
});
