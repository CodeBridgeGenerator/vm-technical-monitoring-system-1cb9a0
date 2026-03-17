
    module.exports = function (app) {
        const modelName = "mem_transfer_items";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            transferDate: { type: Schema.Types.ObjectId, ref: "mem_transfer_details", comment: "Transfer Date, dropdown, false, true, true, true, true, true, true, memTransferDetails, mem_transfer_details, one-to-one, transferDate," },
part: { type: Schema.Types.ObjectId, ref: "mem_warehouse_parts", comment: "Part, dropdown, false, true, true, true, true, true, true, memWarehouseParts, mem_warehouse_parts, one-to-one, part," },
quantity: { type: Number, max: 10000000, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },

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