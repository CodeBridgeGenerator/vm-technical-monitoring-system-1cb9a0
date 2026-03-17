
    module.exports = function (app) {
        const modelName = "technician_checks";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            technicianCheckListId: { type: Schema.Types.ObjectId, ref: "technician_checklists", comment: "Technician Check List Id, dropdown, false, true, true, true, true, true, true, technicianChecklists, technician_checklists, one-to-one, name," },
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