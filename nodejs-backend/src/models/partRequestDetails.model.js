
    module.exports = function (app) {
        const modelName = 'part_request_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            partName: { type: Schema.Types.ObjectId, ref: "parts_master" },
quantity: { type: Number, required: false, max: 10000000 },
status: { type:  String , required: true },
comment: { type:  String , required: true },
requestedDate: { type: Date, required: false },
jobId: { type: Schema.Types.ObjectId, ref: "job_stations" },
Technician: { type: Schema.Types.ObjectId, ref: "users" },

            
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