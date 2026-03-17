
    module.exports = function (app) {
        const modelName = "part_request_details";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            partName: { type: Schema.Types.ObjectId, ref: "parts_master", comment: "Part Name, dropdown, false, true, true, true, true, true, true, partsMaster, parts_master, one-to-one, description," },
quantity: { type: Number, max: 10000000, comment: "Quantity, p_number, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , required: true, comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
comment: { type:  String , required: true, comment: "Comment, p, false, true, true, true, true, true, true, , , , ," },
requestedDate: { type: Date, comment: "Requested Date, calendar_12, false, true, true, true, true, true, true, , , , ," },
jobId: { type: Schema.Types.ObjectId, ref: "job_stations", comment: "Job Id, dropdown, false, true, true, true, true, true, true, jobStations, job_stations, one-to-one, name," },
Technician: { type: Schema.Types.ObjectId, ref: "users", comment: "Technician, dropdown, false, true, true, true, true, true, true, users, users, one-to-one, name," },

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