
    module.exports = function (app) {
        const modelName = "mem_stock_out_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            partName: { type: Schema.Types.ObjectId, ref: "mem_parts", comment: "Part Name, dropdown, false, true, true, true, true, true, true, memParts, mem_parts, one-to-one, item," },
quantity: { type: Number, max: 10000000, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
stockOutType: { type:  String , required: true, comment: "Stock Out Type, p, false, true, true, true, true, true, true, , , , ," },
associatedOrderNumber: { type:  String , maxLength: 150, index: true, trim: true, comment: "Associated Order Number, p, false, true, true, true, true, true, true, , , , ," },
conditionOfItems: { type:  String , required: true, comment: "Condition of Items, p, false, true, true, true, true, true, true, , , , ," },
stockOutDate: { type: Date, comment: "Stock Out Date, p_date, false, true, true, true, true, true, true, , , , ," },

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