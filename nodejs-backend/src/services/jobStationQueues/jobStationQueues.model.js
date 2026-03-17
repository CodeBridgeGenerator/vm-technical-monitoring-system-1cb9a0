
    module.exports = function (app) {
        const modelName = "job_station_queues";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            incomingMachineTicketId: { type: Schema.Types.ObjectId, ref: "incoming_machine_tickets", comment: "Incoming Machine Ticket Id, dropdown, false, true, true, true, true, true, true, incomingMachineTickets, incoming_machine_tickets, one-to-one, machineId," },
selectedJobStations: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Selected Job Stations, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
priority: { type: Number, max: 10000000, comment: "Priority, p_number, false, true, true, true, true, true, true, , , , ," },

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