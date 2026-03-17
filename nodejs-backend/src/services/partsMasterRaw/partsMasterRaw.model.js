
    module.exports = function (app) {
        const modelName = "parts_master_raw";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            serialNo: { type:  String , comment: "SerialNo, p, false, false, false, true, false, false, false, , , , ," },
itemNo: { type:  String , required: true, comment: "ItemNo, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , required: true, comment: "Description, p, false, true, true, true, true, true, true, , , , ," },
quantity: { type:  String , required: true, comment: "Quantity, p, false, true, true, true, true, true, true, , , , ," },
costAmount: { type:  String , required: true, comment: "CostAmount, p, false, true, true, true, true, true, true, , , , ," },

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