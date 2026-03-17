
    module.exports = function (app) {
        const modelName = "customer_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            customerNo: { type:  String , required: true, comment: "Customer No, p, false, true, true, true, true, true, true, , , , ," },
name: { type:  String , required: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
phoneNo: { type:  String , required: true, comment: "Phone No, p, false, true, true, true, true, true, true, , , , ," },
agentName: { type:  String , required: true, comment: "Agent Name, p, false, true, true, true, true, true, true, , , , ," },
address: { type:  String , required: true, comment: "Address, p, false, true, true, true, true, true, true, , , , ," },

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