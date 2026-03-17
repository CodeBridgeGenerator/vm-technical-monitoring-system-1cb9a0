
    module.exports = function (app) {
        const modelName = "incoming_machine_tickets";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            machineId: { type: Schema.Types.ObjectId, ref: "machine_master", comment: "Machine Id, dropdown, false, true, true, true, true, true, true, machineMaster, machine_master, one-to-one, serialNumber," },
checklistResponse: { type:  String , required: true, comment: "Checklist Response, p, false, true, true, true, true, true, true, , , , ," },
assignedSupervisors: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Assigned Supervisors, p, false, true, true, true, true, true, true, , , , ," },
selectedJobStations: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Selected Job Stations, p, false, true, true, true, true, true, true, , , , ," },
startTime: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Start Time, p, false, true, true, true, true, true, true, , , , ," },
endTime: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "End Time, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },

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