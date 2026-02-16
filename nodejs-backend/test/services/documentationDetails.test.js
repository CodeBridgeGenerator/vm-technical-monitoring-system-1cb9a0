const assert = require('assert');
const app = require('../../src/app');

describe('\'documentationDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('documentationDetails');

    assert.ok(service, 'Registered the service (documentationDetails)');
  });
});
