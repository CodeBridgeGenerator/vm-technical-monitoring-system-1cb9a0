
    module.exports = function (app) {
        const modelName = 'sample_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            sourceWarehouse: { type: Schema.Types.ObjectId, ref: "warehouse_master" },
partNumber: { type: Schema.Types.ObjectId, ref: "parts_master" },
quantity: { type: Number, required: false, max: 10000000 },
associatedNumber: { type:  String , required: true },
affectiveDate: { type: Date, required: false },

            
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