
    module.exports = function (app) {
        const modelName = "customer_sales_orders";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            company: { type: Schema.Types.ObjectId, ref: "users", comment: "Company, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
salesOrderId: { type:  String , required: true, comment: "Id, p, false, true, true, true, true, true, true, , , , ," },
salesOrderDate: { type:  String , required: true, comment: "Date, p, false, true, true, true, true, true, true, , , , ," },

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