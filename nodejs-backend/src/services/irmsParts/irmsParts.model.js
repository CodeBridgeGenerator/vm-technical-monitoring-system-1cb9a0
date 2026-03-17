
    module.exports = function (app) {
        const modelName = "irms_parts";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            serialNo: { type:  String , required: true, comment: "Serial No, p, false, true, true, true, true, true, true, , , , ," },
itemNo: { type:  String , required: true, comment: "Item No, p, false, true, true, true, true, true, true, , , , ," },
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