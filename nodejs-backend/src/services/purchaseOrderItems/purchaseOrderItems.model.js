
    module.exports = function (app) {
        const modelName = "purchase_order_items";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            purchaseOrder: { type: Schema.Types.ObjectId, ref: "customer_purchase_orders", comment: "Purchase Order, dropdown, false, true, true, true, true, true, true, customerPurchaseOrders, customer_purchase_orders, one-to-one, purchaseOrderId," },
part: { type: Schema.Types.ObjectId, ref: "parts_master", comment: "Part, dropdown, false, true, true, true, true, true, true, partsMaster, parts_master, one-to-one, description," },
quantity: { type: Number, max: 10000000, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
unitPrice: { type: Number, max: 10000000, comment: "UnitPrice, p_number, false, true, true, true, true, true, true, , , , ," },

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