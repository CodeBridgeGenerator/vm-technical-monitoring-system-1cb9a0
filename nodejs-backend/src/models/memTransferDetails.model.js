
    module.exports = function (app) {
        const modelName = 'mem_transfer_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            sourceWarehouse: { type: Schema.Types.ObjectId, ref: "mem_warehouses" },
destinationWarehouse: { type: Schema.Types.ObjectId, ref: "mem_warehouses" },
transferDate: { type: Date, required: false },
transferStatus: { type:  String , required: true },
deliveryAddress: { type:  String , required: true },
transferDocuments: { type:  String , required: true },

            
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