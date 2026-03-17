
    module.exports = function (app) {
        const modelName = 'irms_machines';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            ownership: { type: Schema.Types.ObjectId, ref: "branches" },
vendingMachineCode: { type:  String , required: true },
modelNo: { type:  String , required: true },
serialNumber: { type:  String , required: true },
vendingMachineType: { type: Schema.Types.ObjectId, ref: "vending_machines" },
commissionDate: { type: Date, required: false },

            
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