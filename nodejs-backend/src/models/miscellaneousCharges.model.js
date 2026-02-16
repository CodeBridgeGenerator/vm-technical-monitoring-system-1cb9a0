
    module.exports = function (app) {
        const modelName = 'miscellaneous_charges';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , required: true },
description: { type:  String , required: true },
amount: { type: Number, required: false, max: 10000000 },
quotationNo: { type: Schema.Types.ObjectId, ref: "irms_quotations" },

            
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