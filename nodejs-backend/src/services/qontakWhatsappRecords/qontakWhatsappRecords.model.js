
    module.exports = function (app) {
        const modelName = "qontak_whatsapp_records";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            channelRoomId: { type:  String , comment: "Channel Room Id, p, false, true, true, true, true, true, true, , , , ," },
qrText: { type:  String , comment: "QR Text, p, false, true, true, true, true, true, true, , , , ," },
extractedMachineId: { type:  String , comment: "Extracted Machine Id, p, false, true, true, true, true, true, true, , , , ," },
vmCode: { type:  String , comment: "VM Code, p, false, true, true, true, true, true, true, , , , ," },
accountUniqueId: { type:  String , comment: "Account Unique Id, p, false, true, true, true, true, true, true, , , , ," },
customerPhoneNo: { type:  String , comment: "Customer Phone No, p, false, true, true, true, true, true, true, , , , ," },
refNo: { type:  String , comment: "Ref No, p, false, true, true, true, true, true, true, , , , ," },
status: { type:  String , comment: "Status, p, false, true, true, true, true, true, true, , , , ," },
landingUrl: { type:  String , comment: "Landing Url, p, false, true, true, true, true, true, true, , , , ," },
source: { type:  String , comment: "Source, p, false, true, true, true, true, true, true, , , , ," },

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