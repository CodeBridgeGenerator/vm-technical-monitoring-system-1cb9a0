
    module.exports = function (app) {
        const modelName = "vm_lists";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            vmCode: { type: Schema.Types.ObjectId, ref: "atlas_machines", comment: "VM Code, dropdown, false, true, true, true, true, true, true, atlasMachines, atlas_machines, one-to-one, vendingMachineCode," },
vmLocation: { type:  String , required: true, comment: "VM Location, p, false, true, true, true, true, true, true, , , , ," },
locationDescription: { type:  String , required: true, comment: "LocationDescription, p, false, true, true, true, true, true, true, , , , ," },

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