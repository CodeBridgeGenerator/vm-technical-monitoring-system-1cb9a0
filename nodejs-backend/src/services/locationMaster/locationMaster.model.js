
    module.exports = function (app) {
        const modelName = "location_master";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
code: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Code, p, false, true, true, true, true, true, true, , , , ," },
type: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Type, p, false, true, true, true, true, true, true, , , , ," },
area: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Area, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Description, p, false, true, true, true, true, true, true, , , , ," },
supervisor: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Supervisor, p, false, true, true, true, true, true, true, , , , ," },

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