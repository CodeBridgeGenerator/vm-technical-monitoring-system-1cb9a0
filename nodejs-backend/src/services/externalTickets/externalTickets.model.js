
    module.exports = function (app) {
        const modelName = "external_tickets";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            machineId: { type: Schema.Types.ObjectId, ref: "machine_master", comment: "Machine Id, dropdown, false, true, true, true, true, true, true, machineMaster, machine_master, one-to-one, serialNumber," },
checklistResponse: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Checklist Response, p, false, true, true, true, true, true, true, , , , ," },
assignedSupervisor: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Assigned Supervisor, p, false, true, true, true, true, true, true, , , , ," },
assignedTechnician: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "AssignedTechnician, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
startTime: { type: Date, comment: "Start Time, calendar_24, false, true, true, true, true, true, true, , , , ," },
endTime: { type: Date, comment: "End Time, calendar_24, false, true, true, true, true, true, true, , , , ," },

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