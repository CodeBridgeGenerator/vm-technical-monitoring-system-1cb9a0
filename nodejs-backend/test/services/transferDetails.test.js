const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("transferDetails service", async () => {
  let thisService;
  let transferDetailCreated;
  let usersServiceResults;
  let users;

  const warehouseMasterCreated = await app.service("warehouseMaster").Model.create({"sourceWarehouse":"parentObjectId","name":"new value","location":"new value"});
const warehouseMasterCreated = await app.service("warehouseMaster").Model.create({"sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","destinationWarehouse":"parentObjectId"});
const partsMasterCreated = await app.service("partsMaster").Model.create({"sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","destinationWarehouse":`${warehouseMasterCreated._id}`,"partNumber":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23});

  beforeEach(async () => {
    thisService = await app.service("transferDetails");

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
    assert.ok(thisService, "Registered the service (transferDetails)");
  });

  describe("#create", () => {
    const options = {"sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","destinationWarehouse":`${warehouseMasterCreated._id}`,"partNumber":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"transferDate":"2026-03-17T15:06:11.798Z","transferStatus":"new value"};

    beforeEach(async () => {
      transferDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new transferDetail", () => {
      assert.strictEqual(transferDetailCreated.sourceWarehouse.toString(), options.sourceWarehouse.toString());
assert.strictEqual(transferDetailCreated.destinationWarehouse.toString(), options.destinationWarehouse.toString());
assert.strictEqual(transferDetailCreated.partNumber.toString(), options.partNumber.toString());
assert.strictEqual(transferDetailCreated.quantity, options.quantity);
assert.strictEqual(transferDetailCreated.transferDate.toISOString(), options.transferDate);
assert.strictEqual(transferDetailCreated.transferStatus, options.transferStatus);
    });
  });

  describe("#get", () => {
    it("should retrieve a transferDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(transferDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), transferDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"sourceWarehouse":`${warehouseMasterCreated._id}`,"destinationWarehouse":`${warehouseMasterCreated._id}`,"partNumber":`${partsMasterCreated._id}`,"quantity":100,"transferDate":"2026-03-17T15:06:11.798Z","transferStatus":"updated value"};

    it("should update an existing transferDetail ", async () => {
      const transferDetailUpdated = await thisService.Model.findByIdAndUpdate(
        transferDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(transferDetailUpdated.sourceWarehouse.toString(), options.sourceWarehouse.toString());
assert.strictEqual(transferDetailUpdated.destinationWarehouse.toString(), options.destinationWarehouse.toString());
assert.strictEqual(transferDetailUpdated.partNumber.toString(), options.partNumber.toString());
assert.strictEqual(transferDetailUpdated.quantity, options.quantity);
assert.strictEqual(transferDetailUpdated.transferDate.toISOString(), options.transferDate);
assert.strictEqual(transferDetailUpdated.transferStatus, options.transferStatus);
    });
  });

  describe("#delete", async () => {
    it("should delete a transferDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("warehouseMaster").Model.findByIdAndDelete(warehouseMasterCreated._id);
await app.service("partsMaster").Model.findByIdAndDelete(partsMasterCreated._id);;

      const transferDetailDeleted = await thisService.Model.findByIdAndDelete(transferDetailCreated._id);
      assert.strictEqual(transferDetailDeleted._id.toString(), transferDetailCreated._id.toString());
    });
  });
});