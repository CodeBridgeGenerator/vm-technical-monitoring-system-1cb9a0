const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("partRequestDetails service", async () => {
  let thisService;
  let partRequestDetailCreated;
  let usersServiceResults;
  let users;

  const partsMasterCreated = await app.service("partsMaster").Model.create({"partName":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23});
const jobStationsCreated = await app.service("jobStations").Model.create({"partName":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"status":"new value","comment":"new value","requestedDate":"2026-03-17T15:06:11.764Z","jobId":"parentObjectId","name":"new value"});
const usersCreated = await app.service("users").Model.create({"partName":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"status":true,"comment":"new value","requestedDate":"2026-03-17T15:06:11.764Z","jobId":`${jobStationsCreated._id}`,"name":"new value","Technician":"parentObjectId","email":"new value","password":"new value","remember_token":true});

  beforeEach(async () => {
    thisService = await app.service("partRequestDetails");

    // Create users here
    usersServiceResults = await app.service("users").Model.create(usersRefData);
    users = {
      createdBy: usersServiceResults[0]._id,
      updatedBy: usersServiceResults[0]._id,
    };
  });

  after(async () => {
    if (usersServiceResults) {
      await Promise.all(
        usersServiceResults.map((i) =>
          app.service("users").Model.findByIdAndDelete(i._id)
        )
      );
    }
  });

  it("registered the service", () => {
    assert.ok(thisService, "Registered the service (partRequestDetails)");
  });

  describe("#create", () => {
    const options = {"partName":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"status":true,"comment":"new value","requestedDate":"2026-03-17T15:06:11.764Z","jobId":`${jobStationsCreated._id}`,"name":"new value","Technician":`${usersCreated._id}`,"email":"new value","password":"new value","remember_token":true};

    beforeEach(async () => {
      partRequestDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new partRequestDetail", () => {
      assert.strictEqual(partRequestDetailCreated.partName.toString(), options.partName.toString());
assert.strictEqual(partRequestDetailCreated.quantity, options.quantity);
assert.strictEqual(partRequestDetailCreated.status, options.status);
assert.strictEqual(partRequestDetailCreated.comment, options.comment);
assert.strictEqual(partRequestDetailCreated.requestedDate.toISOString(), options.requestedDate);
assert.strictEqual(partRequestDetailCreated.jobId.toString(), options.jobId.toString());
assert.strictEqual(partRequestDetailCreated.Technician.toString(), options.Technician.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a partRequestDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(partRequestDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), partRequestDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"partName":`${partsMasterCreated._id}`,"quantity":100,"status":"updated value","comment":"updated value","requestedDate":"2026-03-17T15:06:11.764Z","jobId":`${jobStationsCreated._id}`,"Technician":`${usersCreated._id}`};

    it("should update an existing partRequestDetail ", async () => {
      const partRequestDetailUpdated = await thisService.Model.findByIdAndUpdate(
        partRequestDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(partRequestDetailUpdated.partName.toString(), options.partName.toString());
assert.strictEqual(partRequestDetailUpdated.quantity, options.quantity);
assert.strictEqual(partRequestDetailUpdated.status, options.status);
assert.strictEqual(partRequestDetailUpdated.comment, options.comment);
assert.strictEqual(partRequestDetailUpdated.requestedDate.toISOString(), options.requestedDate);
assert.strictEqual(partRequestDetailUpdated.jobId.toString(), options.jobId.toString());
assert.strictEqual(partRequestDetailUpdated.Technician.toString(), options.Technician.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a partRequestDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("partsMaster").Model.findByIdAndDelete(partsMasterCreated._id);
await app.service("jobStations").Model.findByIdAndDelete(jobStationsCreated._id);
await app.service("users").Model.findByIdAndDelete(usersCreated._id);;

      const partRequestDetailDeleted = await thisService.Model.findByIdAndDelete(partRequestDetailCreated._id);
      assert.strictEqual(partRequestDetailDeleted._id.toString(), partRequestDetailCreated._id.toString());
    });
  });
});