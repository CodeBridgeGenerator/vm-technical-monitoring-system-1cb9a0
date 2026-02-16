const assert = require('assert');
const app = require('../../src/app');

describe('\'warantyPeriodDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('warantyPeriodDetails');

    assert.ok(service, 'Registered the service (warantyPeriodDetails)');
  });
});
