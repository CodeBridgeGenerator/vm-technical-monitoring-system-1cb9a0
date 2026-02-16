
    module.exports = function (app) {
        const modelName = 'workflow_services';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            queueName: { type:  String , required: true },
type: { type:  String , required: true },
data: { type:  String , required: true },
status: { type:  String , required: true },
jobId: { type:  String , required: true },
attemptsMade: { type: Number, required: false, max: 10000000 },
error: { type:  String , required: true },

            
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