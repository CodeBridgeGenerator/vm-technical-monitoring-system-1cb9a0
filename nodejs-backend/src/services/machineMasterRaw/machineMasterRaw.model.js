
    module.exports = function (app) {
        const modelName = "machine_master_raw";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            ownership: { type:  String , required: true, comment: "Ownership, p, false, true, true, true, true, true, true, , , , ," },
vendingMachineCode: { type:  String , required: true, comment: "VendingMachineCode, p, false, true, true, true, true, true, true, , , , ," },
modelNo: { type:  String , required: true, comment: "Model No, p, false, true, true, true, true, true, true, , , , ," },
serialNo: { type:  String , required: true, comment: "Serial No, p, false, true, true, true, true, true, true, , , , ," },
commissionDate: { type:  String , required: true, comment: "CommissionDate, p, false, true, true, true, true, true, true, , , , ," },

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