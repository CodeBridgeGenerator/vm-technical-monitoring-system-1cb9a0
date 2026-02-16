
    module.exports = function (app) {
        const modelName = 'mem_stock_in_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            vmCode: { type: Schema.Types.ObjectId, ref: "atlas_machines" },
pricing: { type: Number, required: false, max: 10000000 },
quantity: { type: Number, required: false, max: 10000000 },
purchaseDate: { type: Date, required: false },
partDescription: { type:  String , required: true },
poNumber: { type:  String , required: true },
doNumber: { type:  String , required: true },
category: { type:  String , required: true },
unitOfMeasurement: { type:  String , required: true },
conditionOfTerms: { type:  String , required: true },
warehouse: { type: Schema.Types.ObjectId, ref: "mem_warehouses" },

            
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