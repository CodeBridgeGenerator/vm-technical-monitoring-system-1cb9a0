
    module.exports = function (app) {
        const modelName = "mem_transfer_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            sourceWarehouse: { type: Schema.Types.ObjectId, ref: "mem_warehouses", comment: "Source Warehouse, dropdown, false, true, true, true, true, true, true, memWarehouses, mem_warehouses, one-to-one, name," },
destinationWarehouse: { type: Schema.Types.ObjectId, ref: "mem_warehouses", comment: "Destination Warehouse, dropdown, false, true, true, true, true, true, true, memWarehouses, mem_warehouses, one-to-one, name," },
transferDate: { type: Date, comment: "Transfer Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
transferStatus: { type:  String , required: true, comment: "Transfer Status, p, false, true, true, true, true, true, true, , , , ," },
deliveryAddress: { type:  String , required: true, comment: "Delivery Address, p, false, true, true, true, true, true, true, , , , ," },
transferDocuments: { type:  String , required: true, comment: "Transfer Documents, p, false, true, true, true, true, true, true, , , , ," },

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