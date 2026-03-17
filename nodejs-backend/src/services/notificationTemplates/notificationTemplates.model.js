
    module.exports = function (app) {
        const modelName = "notification_templates";
        const mongooseClient = app.get("mongooseClient");
        const { Schema } = mongooseClient;
        const schema = new Schema(
          {
            name: { type:  String , required: true, comment: "Name, p, false, true, true, true, true, true, true, , , , ," },
title: { type:  String , required: true, comment: "Title, p, false, true, true, true, true, true, true, , , , ," },
body: { type:  String , required: true, comment: "Body, p, false, true, true, true, true, true, true, , , , ," },
image: { type:  String , required: true, comment: "Image, p, false, true, true, true, true, true, true, , , , ," },

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