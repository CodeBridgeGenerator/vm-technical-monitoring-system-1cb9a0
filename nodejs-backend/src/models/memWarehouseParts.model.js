
    module.exports = function (app) {
        const modelName = 'mem_warehouse_parts';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            part: { type: Schema.Types.ObjectId, ref: "mem_parts" },
warehouse: { type: Schema.Types.ObjectId, ref: "warehouse_master" },
quantity: { type: Number, required: false, max: 10000000 },
costAmount: { type: Number, required: false, max: 10000000 },
reorderingQuantity: { type: Number, required: false, max: 10000000 },
reorderingPoint: { type: Number, required: false, max: 10000000 },

            
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