const assert = require('assert');
const app = require('../../src/app');

describe('\'notificationTemplates\' service', () => {
  it('registered the service', () => {
    const service = app.service('notificationTemplates');

    assert.ok(service, 'Registered the service (notificationTemplates)');
  });
});
