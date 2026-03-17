
    module.exports = function (app) {
        const modelName = "quotation_payement_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quotationIndex: { type: Schema.Types.ObjectId, ref: "irms_quotations", comment: "Quotation Index, dropdown, false, true, true, true, true, true, true, irmsQuotations, irms_quotations, one-to-one, quotationIndex," },
description: { type:  String , required: true, comment: "Description, editor, false, true, true, true, true, true, true, , , , ," },

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