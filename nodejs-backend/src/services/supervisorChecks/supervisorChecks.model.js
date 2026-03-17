
    module.exports = function (app) {
        const modelName = "supervisor_checks";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            supervisorCheckListId: { type: Schema.Types.ObjectId, ref: "external_checklists", comment: "Supervisor Check List Id, dropdown, false, true, true, true, true, true, true, externalChecklists, external_checklists, one-to-one, name," },
name: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Description, p, false, true, true, true, true, true, true, , , , ," },

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