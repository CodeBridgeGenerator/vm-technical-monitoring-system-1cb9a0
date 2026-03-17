
    module.exports = function (app) {
        const modelName = "external_part_requests";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            partName: { type: Schema.Types.ObjectId, ref: "parts_master", comment: "Part Name, dropdown, false, true, true, true, true, true, true, partsMaster, parts_master, one-to-one, itemNo," },
quantity: { type: Number, max: 10000000, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , required: true, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
comment: { type:  String , required: true, comment: "Comment, p, false, true, true, true, true, true, true, , , , ," },
requestedDate: { type: Date, comment: "Requested Date, p_calendar, false, true, true, true, true, true, true, , , , ," },
externalTicket: { type: Schema.Types.ObjectId, ref: "external_tickets", comment: "External Ticket, dropdown, false, true, true, true, true, true, true, externalTickets, external_tickets, one-to-one, machineId," },
technician: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Technician, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
approvedDate: { type: Date, comment: "Approved Date, p_calendar, false, true, true, true, true, true, true, , , , ," },

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