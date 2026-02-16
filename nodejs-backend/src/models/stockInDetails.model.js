
    module.exports = function (app) {
        const modelName = 'stock_in_details';
        const mongooseClient = app.get('mongooseClient');
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            model: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
serialNo: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
partNo: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
pricing: { type: Number, required: false, min: 0, max: 10000000 },
quantity: { type: Number, required: false, min: 0, max: 10000000 },
purchaseDate: { type: Date, required: false },
partDescription: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
poNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
doNumber: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
category: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
unitOfMeasurement: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
conditionOfTerms: { type:  String , minLength: 2, maxLength: 1000, index: true, trim: true },
warehouse: { type: Schema.Types.ObjectId, ref: "warehouse_master" },

            
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