
    module.exports = function (app) {
        const modelName = "machine_master";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            ownership: { type: Schema.Types.ObjectId, ref: "users", comment: "Ownership, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
vendingMachineCode: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "VendingMachineCode, p, false, true, true, true, true, true, true, , , , ," },
modelNo: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Model No, p, false, true, true, true, true, true, true, , , , ," },
serialNumber: { type: Number, max: 27160010, comment: "Serial Number, p_number, false, true, true, true, true, true, true, , , , ," },
vendingMachineType: { type: Schema.Types.ObjectId, ref: "vending_machines", comment: "VendingMachineType, dropdown, false, true, true, true, true, true, true, vendingMachines, vending_machines, one-to-one, name," },
comissionDate: { type: Date, comment: "Comission Date, p_calendar, false, true, true, true, true, true, true, , , , ," },

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