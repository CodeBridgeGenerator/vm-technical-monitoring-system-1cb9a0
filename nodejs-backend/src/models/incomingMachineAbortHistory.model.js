
    module.exports = function (app) {
        const modelName = 'incoming_machine_abort_history';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            ticketId: { type: Schema.Types.ObjectId, ref: "incoming_machine_tickets" },
abortedBy: { type: Schema.Types.ObjectId, ref: "users" },
abortReason: { type:  String , required: true },
abortedAt: { type: Date, required: false },
machineId: { type: Schema.Types.ObjectId, ref: "machine_master" },
status: { type:  String , required: true },

            
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