
    module.exports = function (app) {
        const modelName = 'atlas_machines';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            ownership: { type: Schema.Types.ObjectId, ref: "users" },
vmCode: { type:  String , required: true },
modelNo: { type:  String , required: true },
serialNo: { type:  String , required: true },
vmType: { type: Schema.Types.ObjectId, ref: "vending_machines" },
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