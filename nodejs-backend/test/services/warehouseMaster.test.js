const assert = require('assert');
const app = require('../../src/app');

describe('\'warehouseMaster\' service', () => {
  it('registered the service', () => {
    const service = app.service('warehouseMaster');

    assert.ok(service, 'Registered the service (warehouseMaster)');
  });
});
