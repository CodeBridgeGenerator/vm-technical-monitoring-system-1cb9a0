const { VmLists } = require('./vmLists.class');
const createModel = require('../../models/vmLists.model');
const hooks = require('./vmLists.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    whitelist: ["$populate"],
    multi: ["create"],
  };

  // Initialize our service with any options it requires
  app.use('/vmLists', new VmLists(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('vmLists');

  // Get the schema of the collections 
  app.get("/vmListsSchema", function (request, response) {
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