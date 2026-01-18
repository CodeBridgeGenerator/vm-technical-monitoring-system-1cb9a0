
    module.exports = function (app) {
        const modelName = 'customer_purchase_orders';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quotation: { type: Schema.Types.ObjectId, ref: "irms_quotations" },
purchaseOrderDate: { type: Date, required: false },
deliveryDate: { type: Date, required: false },
purchaseOrderId: { type:  String , required: true },

            
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