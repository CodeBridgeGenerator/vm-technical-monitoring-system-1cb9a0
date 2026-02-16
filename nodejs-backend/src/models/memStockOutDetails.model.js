
    module.exports = function (app) {
        const modelName = 'mem_stock_out_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            partName: { type: Schema.Types.ObjectId, ref: "mem_parts" },
quantity: { type: Number, required: false, max: 10000000 },
stockOutType: { type:  String , required: true },
associatedOrderNumber: { type:  String , maxLength: 150, index: true, trim: true },
conditionOfItems: { type:  String , required: true },
stockOutDate: { type: Date, required: false },

            
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