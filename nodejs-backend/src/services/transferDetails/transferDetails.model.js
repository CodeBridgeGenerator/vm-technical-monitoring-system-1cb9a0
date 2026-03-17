
    module.exports = function (app) {
        const modelName = "transfer_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            sourceWarehouse: { type: Schema.Types.ObjectId, ref: "warehouse_master", comment: "Source Warehouse, dropdown, false, true, true, true, true, true, true, warehouseMaster, warehouse_master, one-to-one, name," },
destinationWarehouse: { type: Schema.Types.ObjectId, ref: "warehouse_master", comment: "Destination Warehouse, dropdown, false, true, true, true, true, true, true, warehouseMaster, warehouse_master, one-to-one, name," },
partNumber: { type: Schema.Types.ObjectId, ref: "parts_master", comment: "Part Number, dropdown, false, true, true, true, true, true, true, partsMaster, parts_master, one-to-one, itemNo," },
quantity: { type: Number, max: 10000000, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
transferDate: { type: Date, comment: "Transfer Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
transferStatus: { type:  String , required: true, comment: "Transfer Status, p, false, true, true, true, true, true, true, , , , ," },

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