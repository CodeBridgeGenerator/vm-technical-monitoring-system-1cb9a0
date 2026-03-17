
    module.exports = function (app) {
        const modelName = "stock_in_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            model: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Model, p, false, true, true, true, true, true, true, , , , ," },
serialNo: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Serial No, p, false, true, true, true, true, true, true, , , , ," },
partNo: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Part No, p, false, true, true, true, true, true, true, , , , ," },
pricing: { type: Number, max: 10000000, comment: "Pricing, p_number, false, true, true, true, true, true, true, , , , ," },
quantity: { type: Number, max: 10000000, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
purchaseDate: { type: Date, comment: "Purchase Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
partDescription: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Part Description, inputTextarea, false, true, true, true, true, true, true, , , , ," },
poNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "PO Number, p, false, true, true, true, true, true, true, , , , ," },
doNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "DO Number, p, false, true, true, true, true, true, true, , , , ," },
category: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Category, p, false, true, true, true, true, true, true, , , , ," },
unitOfMeasurement: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Unit of Measurement, p, false, true, true, true, true, true, true, , , , ," },
conditionOfTerms: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Condition of Terms, p, false, true, true, true, true, true, true, , , , ," },
warehouse: { type: Schema.Types.ObjectId, ref: "warehouse_master", comment: "Warehouse, dropdown, false, true, true, true, true, true, true, warehouseMaster, warehouse_master, one-to-one, name," },

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