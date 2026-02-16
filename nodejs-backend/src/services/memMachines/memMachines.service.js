const { MemMachines } = require('./memMachines.class');
const createModel = require('../../models/memMachines.model');
const hooks = require('./memMachines.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/memMachines', new MemMachines(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('memMachines');

  // Get the schema of the collections 
  app.get("/memMachinesSchema", function (request, response) {
    const schema = createModel(app).schema.tree;
    const result = Object.keys(schema).map(key => {
      return {
        field: key,
        properties: schema[key]
      };
    });
    return response.status(200).json(result);
  });

  service.hooks(hooks);
};