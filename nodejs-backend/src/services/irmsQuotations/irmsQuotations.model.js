
    module.exports = function (app) {
        const modelName = "irms_quotations";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            salesOrder: { type: Schema.Types.ObjectId, ref: "customer_sales_orders", comment: "Sales Order, dropdown, false, true, true, true, true, true, true, customerSalesOrders, customer_sales_orders, one-to-one, salesOrderId," },
validDate: { type: Date, comment: "Valid Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
quotationIndex: { type:  String , required: true, comment: "Quotation Index, p, false, true, true, true, true, true, true, , , , ," },

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