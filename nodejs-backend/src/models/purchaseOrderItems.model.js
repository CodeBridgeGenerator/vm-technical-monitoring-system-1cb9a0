
    module.exports = function (app) {
        const modelName = 'purchase_order_items';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            purchaseOrder: { type: Schema.Types.ObjectId, ref: "customer_purchase_orders" },
part: { type: Schema.Types.ObjectId, ref: "parts_master" },
quantity: { type: Number, required: false, max: 10000000 },
unitPrice: { type: Number, required: false, max: 10000000 },

            
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