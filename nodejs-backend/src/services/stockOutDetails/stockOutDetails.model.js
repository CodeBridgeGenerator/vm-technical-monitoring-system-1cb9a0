
    module.exports = function (app) {
        const modelName = "stock_out_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            partName: { type: Schema.Types.ObjectId, ref: "parts_master", comment: "PartName, dropdown, false, true, true, true, true, true, true, partsMaster, parts_master, one-to-one, description," },
stockOutType: { type:  String , required: true, comment: "StockOutType, p, false, true, true, true, true, true, true, , , , ," },
associatedOrderNumber: { type:  String , required: true, comment: "AssociatedOrderNumber, p, false, true, true, true, true, true, true, , , , ," },
conditionOfItems: { type:  String , required: true, comment: "ConditionOfItems, p, false, true, true, true, true, true, true, , , , ," },

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