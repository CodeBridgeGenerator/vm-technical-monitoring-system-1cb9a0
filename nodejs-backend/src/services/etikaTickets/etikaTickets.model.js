
    module.exports = function (app) {
        const modelName = "etika_tickets";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            machineId: { type: Schema.Types.ObjectId, ref: "machine_master", comment: "Machine Id, dropdown, false, true, true, true, true, true, true, machineMaster, machine_master, one-to-one, serialNumber," },
checklistResponse: { type:  String , required: true, comment: "Checklist Response, p, false, true, true, true, true, true, true, , , , ," },
etikaRequestor: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Etika Requestor, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
assignedSupervisor: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Assigned Supervisor, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
assignedTechnician: { type: Schema.Types.ObjectId, ref: "profiles", comment: "Assigned Technician, dropdown, false, true, true, true, true, true, true, profiles, profiles, one-to-one, name," },
status: { type:  String , required: true, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
startTime: { type: Date, comment: "Start Time, calendar_12, false, true, true, true, true, true, true, , , , ," },
endTime: { type: Date, comment: "End Time, calendar_12, false, true, true, true, true, true, true, , , , ," },
supervisorStartTime: { type: Date, comment: "Supervisor Start Time, calendar_12, false, true, true, true, true, true, true, , , , ," },
supervisorEndTime: { type: Date, comment: "Supervisor End Time, calendar_12, false, true, true, true, true, true, true, , , , ," },
technicianStartTime: { type: Date, comment: "Technician Start Time, calendar_12, false, true, true, true, true, true, true, , , , ," },
technicianEndTime: { type: Date, comment: "Technician End Time, calendar_12, false, true, true, true, true, true, true, , , , ," },
comments: { type:  String , required: true, comment: "Comments, p, false, true, true, true, true, true, true, , , , ," },
machineImage: { type:  String , required: true, comment: "Machine Image, p, false, true, true, true, true, true, true, , , , ," },

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