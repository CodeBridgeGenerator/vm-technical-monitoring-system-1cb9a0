
    module.exports = function (app) {
        const modelName = "incoming_machine_checks";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            checkListId: { type: Schema.Types.ObjectId, ref: "incoming_machine_checklists", comment: "CheckListId, dropdown, false, true, true, true, true, true, true, incomingMachineChecklists, incoming_machine_checklists, one-to-one, name," },
name: { type:  String , required: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , required: true, comment: "Description, p, false, true, true, true, true, true, true, , , , ," },

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