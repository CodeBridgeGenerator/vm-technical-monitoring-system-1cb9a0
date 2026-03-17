
    module.exports = function (app) {
        const modelName = "incoming_machine_abort_history";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            ticketId: { type: Schema.Types.ObjectId, ref: "incoming_machine_tickets", comment: "Ticket Id, dropdown, false, true, true, true, true, true, true, incomingMachineTickets, incoming_machine_tickets, one-to-one, machineId," },
abortedBy: { type: Schema.Types.ObjectId, ref: "users", comment: "Aborted By, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },
abortReason: { type:  String , required: true, comment: "Abort Reason, p, false, true, true, true, true, true, true, , , , ," },
abortedAt: { type: Date, comment: "Aborted At, calendar_12, false, true, true, true, true, true, true, , , , ," },
machineId: { type: Schema.Types.ObjectId, ref: "machine_master", comment: "Machine Id, dropdown, false, true, true, true, true, true, true, machineMaster, machine_master, one-to-one, modelNo," },
status: { type:  String , required: true, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

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