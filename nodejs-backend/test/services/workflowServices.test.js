const assert = require('assert');
const app = require('../../src/app');

describe('\'workflowServices\' service', () => {
  it('registered the service', () => {
    const service = app.service('workflowServices');

    assert.ok(service, 'Registered the service (workflowServices)');
  });
});
