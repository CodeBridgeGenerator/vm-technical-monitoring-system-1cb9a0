const assert = require('assert');
const app = require('../../src/app');

describe('\'quotationPayementDetails\' service', () => {
  it('registered the service', () => {
    const service = app.service('quotationPayementDetails');

    assert.ok(service, 'Registered the service (quotationPayementDetails)');
  });
});
