
    module.exports = function (app) {
        const modelName = "irms_warehouse_parts";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            part: { type: Schema.Types.ObjectId, ref: "irms_parts", comment: "Part, dropdown, false, true, true, true, true, true, true, irmsParts, irms_parts, one-to-one, itemNo," },
warehouse: { type: Schema.Types.ObjectId, ref: "warehouse_master", comment: "Warehouse, dropdown, false, true, true, true, true, true, true, warehouseMaster, warehouse_master, one-to-one, name," },
quantity: { type: Number, max: 10000000, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
costAmount: { type: Number, max: 10000000, comment: "Cost Amount , p_number, false, true, true, true, true, true, true, , , , ," },
reorderingQuantity: { type: Number, max: 10000000, comment: "Reordering Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
reorderingPoint: { type: Number, max: 10000000, comment: "Reordering Point, p_number, false, true, true, true, true, true, true, , , , ," },

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