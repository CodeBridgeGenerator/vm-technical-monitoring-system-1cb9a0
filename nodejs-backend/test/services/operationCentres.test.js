const assert = require('assert');
const app = require('../../src/app');

describe('\'operationCentres\' service', () => {
  it('registered the service', () => {
    const service = app.service('operationCentres');

    assert.ok(service, 'Registered the service (operationCentres)');
  });
});
