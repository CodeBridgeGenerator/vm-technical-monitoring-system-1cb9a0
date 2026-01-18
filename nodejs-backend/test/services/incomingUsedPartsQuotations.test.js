const assert = require('assert');
const app = require('../../src/app');

describe('\'incomingUsedPartsQuotations\' service', () => {
  it('registered the service', () => {
    const service = app.service('incomingUsedPartsQuotations');

    assert.ok(service, 'Registered the service (incomingUsedPartsQuotations)');
  });
});
