
    module.exports = function (app) {
        const modelName = 'location_master';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
code: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
type: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
area: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
description: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
supervisor: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },

            
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