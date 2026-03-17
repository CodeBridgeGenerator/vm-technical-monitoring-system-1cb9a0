
    module.exports = function (app) {
        const modelName = "mem_warehouses";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , required: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
locataion: { type:  String , required: true, comment: "Locataion, p, false, true, true, true, true, true, true, , , , ," },
ownership: { type: Schema.Types.ObjectId, ref: "branches", comment: "Ownership, dropdown, false, true, true, true, true, true, true, branches, branches, one-to-one, name," },

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