const { PartsMaster } = require('./partsMaster.class');
const createModel = require('../../models/partsMaster.model');
const hooks = require('./partsMaster.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/partsMaster', new PartsMaster(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('partsMaster');

  // Get the schema of the collections 
  app.get("/partsMasterSchema", function (request, response) {
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