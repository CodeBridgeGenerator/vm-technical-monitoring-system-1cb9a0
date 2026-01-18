const assert = require('assert');
const app = require('../../src/app');

describe('\'disposalDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('disposalDetails');

    assert.ok(service, 'Registered the service (disposalDetails)');
  });
});
