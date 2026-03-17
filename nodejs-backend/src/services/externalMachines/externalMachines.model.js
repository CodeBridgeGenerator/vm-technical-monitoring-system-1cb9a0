
    module.exports = function (app) {
        const modelName = "external_machines";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            ownership: { type: Schema.Types.ObjectId, ref: "branches", comment: "Ownership, dropdown, false, true, true, true, true, true, true, branches, branches, one-to-one, name," },
vendingMachineCode: { type:  String , required: true, comment: "Vending Machine Code, p, false, true, true, true, true, true, true, , , , ," },
modelNo: { type:  String , required: true, comment: "Model No, p, false, true, true, true, true, true, true, , , , ," },
serialNumber: { type:  String , required: true, comment: "Serial Number, p, false, true, true, true, true, true, true, , , , ," },
vendingMachineType: { type: Schema.Types.ObjectId, ref: "vending_machines", comment: "Vending Machine Type, dropdown, false, true, true, true, true, true, true, vendingMachines, vending_machines, one-to-one, name," },
commissionDate: { type: Date, comment: "Commission Date, p_date, false, true, true, true, true, true, true, , , , ," },

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