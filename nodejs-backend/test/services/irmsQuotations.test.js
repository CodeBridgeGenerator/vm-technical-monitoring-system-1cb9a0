const assert = require('assert');
const app = require('../../src/app');

describe('\'irmsQuotations\' service', () => {
  it('registered the service', () => {
    const service = app.service('irmsQuotations');

    assert.ok(service, 'Registered the service (irmsQuotations)');
  });
});
