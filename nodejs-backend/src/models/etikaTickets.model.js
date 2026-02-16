
    module.exports = function (app) {
        const modelName = 'etika_tickets';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            machineId: { type: Schema.Types.ObjectId, ref: "machine_master" },
checklistResponse: { type:  String , required: true },
etikaRequestor: { type: Schema.Types.ObjectId, ref: "profiles" },
assignedSupervisor: { type: Schema.Types.ObjectId, ref: "profiles" },
assignedTechnician: { type: Schema.Types.ObjectId, ref: "profiles" },
status: { type:  String , required: true },
startTime: { type: Date, required: false },
endTime: { type: Date, required: false },
supervisorStartTime: { type: Date, required: false },
supervisorEndTime: { type: Date, required: false },
technicianStartTime: { type: Date, required: false },
technicianEndTime: { type: Date, required: false },
comments: { type:  String , required: true },
machineImage: { type:  String , required: true },

            
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