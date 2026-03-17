
    module.exports = function (app) {
        const modelName = "sales_order_items";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            salesOrder: { type: Schema.Types.ObjectId, ref: "customer_sales_orders", comment: "Sales Order, dropdown, false, true, true, true, true, true, true, customerSalesOrders, customer_sales_orders, one-to-one, salesOrderId," },
part: { type: Schema.Types.ObjectId, ref: "parts_master", comment: "Part, dropdown, false, true, true, true, true, true, true, partsMaster, parts_master, one-to-one, description," },
quantity: { type: Number, max: 10000000, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },

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