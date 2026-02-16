const assert = require('assert');
const app = require('../../src/app');

describe('\'machineMasterRaw\' service', () => {
  it('registered the service', () => {
    const service = app.service('machineMasterRaw');

    assert.ok(service, 'Registered the service (machineMasterRaw)');
  });
});
