
    module.exports = function (app) {
        const modelName = 'operation_centres';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
code: { type: Schema.Types.ObjectId, ref: "location_master" },
description: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },

            
            createdBy: { type: Schema.Types.ObjectId, ref: "users", required: true },
            updatedBy: { type: Schema.Types.ObjectId, ref: "users", required: true }
          },
          {
            timestamps: true
        });
      
       
        if (mongooseClient.modelNames().includes(modelName)) {
          mongooseClient.deleteModel(modelName);
        }
        return mongooseClient.model(modelName, schema);
        
      };