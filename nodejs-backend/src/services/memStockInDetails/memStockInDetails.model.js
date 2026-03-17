
    module.exports = function (app) {
        const modelName = "mem_stock_in_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            vmCode: { type: Schema.Types.ObjectId, ref: "atlas_machines", comment: "VmCode, dropdown, false, true, true, true, true, true, true, atlasMachines, atlas_machines, one-to-one, vendingMachineCode," },
pricing: { type: Number, max: 10000000, comment: "Pricing, p_number, false, true, true, true, true, true, true, , , , ," },
quantity: { type: Number, max: 10000000, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
purchaseDate: { type: Date, comment: "Purchase Date, p_date, false, true, true, true, true, true, true, , , , ," },
partDescription: { type:  String , required: true, comment: "Part Description, p, false, true, true, true, true, true, true, , , , ," },
poNumber: { type:  String , required: true, comment: "PO Number, p, false, true, true, true, true, true, true, , , , ," },
doNumber: { type:  String , required: true, comment: "DO Number, p, false, true, true, true, true, true, true, , , , ," },
category: { type:  String , required: true, comment: "Category, p, false, true, true, true, true, true, true, , , , ," },
unitOfMeasurement: { type:  String , required: true, comment: "Unit of Measurement, p, false, true, true, true, true, true, true, , , , ," },
conditionOfTerms: { type:  String , required: true, comment: "Condition of Terms, p, false, true, true, true, true, true, true, , , , ," },
warehouse: { type: Schema.Types.ObjectId, ref: "mem_warehouses", comment: "Warehouse, dropdown, false, true, true, true, true, true, true, memWarehouses, mem_warehouses, one-to-one, name," },

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