
    module.exports = function (app) {
        const modelName = 'machine_master';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            ownership: { type: Schema.Types.ObjectId, ref: "users" },
vendingMachineCode: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
modelNo: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
serialNumber: { type: Number, required: false, min: 0, max: 27160010 },
vendingMachineType: { type: Schema.Types.ObjectId, ref: "vending_machines" },
comissionDate: { type: Date, required: false },

            
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