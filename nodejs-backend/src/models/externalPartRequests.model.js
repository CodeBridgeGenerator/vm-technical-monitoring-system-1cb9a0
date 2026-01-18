
    module.exports = function (app) {
        const modelName = 'external_part_requests';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            partName: { type: Schema.Types.ObjectId, ref: "parts_master" },
quantity: { type: Number, required: false, max: 10000000 },
status: { type:  String , required: true },
comment: { type:  String , required: true },
requestedDate: { type: Date, required: false },
externalTicket: { type: Schema.Types.ObjectId, ref: "external_tickets" },
technician: { type: Schema.Types.ObjectId, ref: "profiles" },
approvedDate: { type: Date, required: false },

            
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