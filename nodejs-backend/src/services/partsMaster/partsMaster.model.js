
    module.exports = function (app) {
        const modelName = "parts_master";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            serialNo: { type:  String , required: true, comment: "Serial No, p, false, true, true, true, true, true, true, , , , ," },
itemNo: { type:  String , required: true, comment: "Item No, p, false, true, true, true, true, true, true, , , , ," },
description: { type:  String , required: true, comment: "Description, p, false, true, true, true, true, true, true, , , , ," },
quantity: { type: Number, max: 10000000, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
costAmount: { type: Number, max: 10000000, comment: "Cost Amount, p_number, false, true, true, true, true, true, true, , , , ," },

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