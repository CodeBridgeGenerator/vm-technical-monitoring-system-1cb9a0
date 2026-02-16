const { TechnicianChecklists } = require('./technicianChecklists.class');
const createModel = require('../../models/technicianChecklists.model');
const hooks = require('./technicianChecklists.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/technicianChecklists', new TechnicianChecklists(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('technicianChecklists');

  // Get the schema of the collections 
  app.get("/technicianChecklistsSchema", function (request, response) {
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