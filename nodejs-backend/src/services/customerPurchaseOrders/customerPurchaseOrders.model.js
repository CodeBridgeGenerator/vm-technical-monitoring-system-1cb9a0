
    module.exports = function (app) {
        const modelName = "customer_purchase_orders";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quotation: { type: Schema.Types.ObjectId, ref: "irms_quotations", comment: "Quotation, dropdown, false, true, true, true, true, true, true, irmsQuotations, irms_quotations, one-to-one, quotationIndex," },
purchaseOrderDate: { type: Date, comment: "Purchase Order Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
deliveryDate: { type: Date, comment: "Delivery Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
purchaseOrderId: { type:  String , required: true, comment: "PurchaseOrderId, p, false, true, true, true, true, true, true, , , , ," },

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