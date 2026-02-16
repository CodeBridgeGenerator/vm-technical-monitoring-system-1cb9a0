
    module.exports = function (app) {
        const modelName = 'machine_master_raw';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            ownership: { type:  String , required: true, minLength: null, maxLength: null },
vendingMachineCode: { type:  String , required: true, minLength: null, maxLength: null },
modelNo: { type:  String , required: true, minLength: null, maxLength: null },
serialNo: { type:  String , required: true, minLength: null, maxLength: null },
commissionDate: { type:  String , required: true, maxLength: null },

            
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