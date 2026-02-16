
    module.exports = function (app) {
        const modelName = 'parts_master';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            serialNo: { type:  String , required: true, maxLength: null },
itemNo: { type:  String , required: true },
description: { type:  String , required: true },
quantity: { type: Number, required: false, max: 10000000 },
costAmount: { type: Number, required: false, max: 10000000 },

            
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