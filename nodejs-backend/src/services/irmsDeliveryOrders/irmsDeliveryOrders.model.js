
    module.exports = function (app) {
        const modelName = "irms_delivery_orders";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            purchaseOrder: { type: Schema.Types.ObjectId, ref: "customer_purchase_orders", comment: "PurchaseOrder, dropdown, false, true, true, true, true, true, true, customerPurchaseOrders, customer_purchase_orders, one-to-one, purchaseOrderId," },
deliveryOrderId: { type:  String , required: true, comment: "Delivery Order Id, p, false, true, true, true, true, true, true, , , , ," },

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