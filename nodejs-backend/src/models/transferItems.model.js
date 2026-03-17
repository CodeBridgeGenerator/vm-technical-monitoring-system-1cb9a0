
    module.exports = function (app) {
        const modelName = 'transfer_items';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            transferDate: { type: Schema.Types.ObjectId, ref: "transfer_details" },
part: { type: Schema.Types.ObjectId, ref: "parts_master" },
quantity: { type: Number, required: false, max: 10000000 },

            
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