
    module.exports = function (app) {
        const modelName = "delivery_order_items";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            deliveryOrders: { type: Schema.Types.ObjectId, ref: "irms_delivery_orders", comment: "Delivery Orders, dropdown, false, true, true, true, true, true, true, irmsDeliveryOrders, irms_delivery_orders, one-to-one, deliveryOrderId," },
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