const assert = require('assert');
const app = require('../../src/app');

describe('\'machineMaster\' service', () => {
  it('registered the service', () => {
    const service = app.service('machineMaster');

    assert.ok(service, 'Registered the service (machineMaster)');
  });
});
