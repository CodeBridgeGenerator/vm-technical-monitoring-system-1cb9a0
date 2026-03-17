
    module.exports = function (app) {
        const modelName = "incoming_used_parts_quotations";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            quotation: { type: Schema.Types.ObjectId, ref: "irms_quotations", comment: "Quotation, dropdown, false, true, true, true, true, true, true, irmsQuotations, irms_quotations, one-to-one, quotationIndex," },
incomingMachineTicket: { type: Schema.Types.ObjectId, ref: "incoming_machine_tickets", comment: "IncomingMachineTicket, dropdown, false, true, true, true, true, true, true, incomingMachineTickets, incoming_machine_tickets, one-to-one, machineId," },

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