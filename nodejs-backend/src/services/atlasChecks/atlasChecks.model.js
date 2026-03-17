
    module.exports = function (app) {
        const modelName = "atlas_checks";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            atlasCheckListId: { type: Schema.Types.ObjectId, ref: "atlas_checklists", comment: "AtlasCheckListId, dropdown, false, true, true, true, true, true, true, atlasChecklists, atlas_checklists, one-to-one, name," },
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