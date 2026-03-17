const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("sampleDetails service", async () => {
  let thisService;
  let sampleDetailCreated;
  let usersServiceResults;
  let users;

  const warehouseMasterCreated = await app.service("warehouseMaster").Model.create({"sourceWarehouse":"parentObjectId","name":"new value","location":"new value"});
const partsMasterCreated = await app.service("partsMaster").Model.create({"sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","partNumber":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23});

  beforeEach(async () => {
    thisService = await app.service("sampleDetails");

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
    assert.ok(thisService, "Registered the service (sampleDetails)");
  });

  describe("#create", () => {
    const options = {"sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","partNumber":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"associatedNumber":"new value","affectiveDate":"2026-03-17T15:06:11.815Z"};

    beforeEach(async () => {
      sampleDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new sampleDetail", () => {
      assert.strictEqual(sampleDetailCreated.sourceWarehouse.toString(), options.sourceWarehouse.toString());
assert.strictEqual(sampleDetailCreated.partNumber.toString(), options.partNumber.toString());
assert.strictEqual(sampleDetailCreated.quantity, options.quantity);
assert.strictEqual(sampleDetailCreated.associatedNumber, options.associatedNumber);
assert.strictEqual(sampleDetailCreated.affectiveDate.toISOString(), options.affectiveDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a sampleDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(sampleDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), sampleDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"sourceWarehouse":`${warehouseMasterCreated._id}`,"partNumber":`${partsMasterCreated._id}`,"quantity":100,"associatedNumber":"updated value","affectiveDate":"2026-03-17T15:06:11.815Z"};

    it("should update an existing sampleDetail ", async () => {
      const sampleDetailUpdated = await thisService.Model.findByIdAndUpdate(
        sampleDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(sampleDetailUpdated.sourceWarehouse.toString(), options.sourceWarehouse.toString());
assert.strictEqual(sampleDetailUpdated.partNumber.toString(), options.partNumber.toString());
assert.strictEqual(sampleDetailUpdated.quantity, options.quantity);
assert.strictEqual(sampleDetailUpdated.associatedNumber, options.associatedNumber);
assert.strictEqual(sampleDetailUpdated.affectiveDate.toISOString(), options.affectiveDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a sampleDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("warehouseMaster").Model.findByIdAndDelete(warehouseMasterCreated._id);
await app.service("partsMaster").Model.findByIdAndDelete(partsMasterCreated._id);;

      const sampleDetailDeleted = await thisService.Model.findByIdAndDelete(sampleDetailCreated._id);
      assert.strictEqual(sampleDetailDeleted._id.toString(), sampleDetailCreated._id.toString());
    });
  });
});