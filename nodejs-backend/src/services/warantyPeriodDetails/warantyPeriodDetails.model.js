
    module.exports = function (app) {
        const modelName = "waranty_period_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , required: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
period: { type:  String , required: true, comment: "Period, p, false, true, true, true, true, true, true, , , , ," },
quotationIndex: { type: Schema.Types.ObjectId, ref: "irms_quotations", comment: "QuotationIndex, dropdown, false, true, true, true, true, true, true, irmsQuotations, irms_quotations, one-to-one, quotationIndex," },

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