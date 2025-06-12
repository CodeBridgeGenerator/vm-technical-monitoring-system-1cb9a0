
    module.exports = function (app) {
        const modelName = 'incoming_machine_tickets';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            machineId: { type: Schema.Types.ObjectId, ref: "machine_master" },
checklistResponse: { type:  String , required: true },
assignedSupervisors: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
selectedJobStations: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
startTime: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
endTime: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
status: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },

            
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