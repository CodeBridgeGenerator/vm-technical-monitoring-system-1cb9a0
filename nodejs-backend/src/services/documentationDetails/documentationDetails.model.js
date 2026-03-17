
    module.exports = function (app) {
        const modelName = "documentation_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            fileName: { type:  String , required: true, comment: "File Name, p, false, true, true, true, true, true, true, , , , ," },
documentationFile: { type: Schema.Types.ObjectId, ref: "document_storages", comment: "Documentation File, dropdown, false, true, true, true, true, true, true, documentStorages, document_storages, one-to-one, name," },

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