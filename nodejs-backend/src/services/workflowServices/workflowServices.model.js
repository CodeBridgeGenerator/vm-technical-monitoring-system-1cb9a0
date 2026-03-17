
    module.exports = function (app) {
        const modelName = "workflow_services";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            queueName: { type:  String , required: true, comment: "Queue Name, p, false, true, true, true, true, true, true, , , , ," },
type: { type:  String , required: true, comment: "Type, p, false, true, true, true, true, true, true, , , , ," },
data: { type:  String , required: true, comment: "Data, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , required: true, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
jobId: { type:  String , required: true, comment: "Job Id, p, false, true, true, true, true, true, true, , , , ," },
attemptsMade: { type: Number, max: 10000000, comment: "Attempts Made, p_number, false, true, true, true, true, true, true, , , , ," },
error: { type:  String , required: true, comment: "Error, p, false, true, true, true, true, true, true, , , , ," },

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