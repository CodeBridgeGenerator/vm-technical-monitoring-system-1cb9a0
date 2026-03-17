const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("transferItems service", async () => {
  let thisService;
  let transferItemCreated;
  let usersServiceResults;
  let users;

  const warehouseMasterCreated = await app.service("warehouseMaster").Model.create({"transferDate":"parentObjectId","sourceWarehouse":"parentObjectId","name":"new value","location":"new value"});
const warehouseMasterCreated = await app.service("warehouseMaster").Model.create({"transferDate":"parentObjectId","sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","destinationWarehouse":"parentObjectId"});
const partsMasterCreated = await app.service("partsMaster").Model.create({"transferDate":"parentObjectId","sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","destinationWarehouse":`${warehouseMasterCreated._id}`,"partNumber":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23});
const transferDetailsCreated = await app.service("transferDetails").Model.create({"transferDate":"2026-03-17T15:06:12.093Z","sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","destinationWarehouse":`${warehouseMasterCreated._id}`,"partNumber":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"transferStatus":"new value"});
const partsMasterCreated = await app.service("partsMaster").Model.create({"transferDate":`${transferDetailsCreated._id}`,"sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","destinationWarehouse":`${warehouseMasterCreated._id}`,"partNumber":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"transferStatus":"new value","part":"parentObjectId"});

  beforeEach(async () => {
    thisService = await app.service("transferItems");

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
    assert.ok(thisService, "Registered the service (transferItems)");
  });

  describe("#create", () => {
    const options = {"transferDate":`${transferDetailsCreated._id}`,"sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","destinationWarehouse":`${warehouseMasterCreated._id}`,"partNumber":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"transferStatus":"new value","part":`${partsMasterCreated._id}`};

    beforeEach(async () => {
      transferItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new transferItem", () => {
      assert.strictEqual(transferItemCreated.transferDate.toString(), options.transferDate.toString());
assert.strictEqual(transferItemCreated.part.toString(), options.part.toString());
assert.strictEqual(transferItemCreated.quantity, options.quantity);
    });
  });

  describe("#get", () => {
    it("should retrieve a transferItem by ID", async () => {
      const retrieved = await thisService.Model.findById(transferItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), transferItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"transferDate":`${transferDetailsCreated._id}`,"part":`${partsMasterCreated._id}`,"quantity":100};

    it("should update an existing transferItem ", async () => {
      const transferItemUpdated = await thisService.Model.findByIdAndUpdate(
        transferItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(transferItemUpdated.transferDate.toString(), options.transferDate.toString());
assert.strictEqual(transferItemUpdated.part.toString(), options.part.toString());
assert.strictEqual(transferItemUpdated.quantity, options.quantity);
    });
  });

  describe("#delete", async () => {
    it("should delete a transferItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("warehouseMaster").Model.findByIdAndDelete(warehouseMasterCreated._id);
await app.service("partsMaster").Model.findByIdAndDelete(partsMasterCreated._id);
await app.service("transferDetails").Model.findByIdAndDelete(transferDetailsCreated._id);;

      const transferItemDeleted = await thisService.Model.findByIdAndDelete(transferItemCreated._id);
      assert.strictEqual(transferItemDeleted._id.toString(), transferItemCreated._id.toString());
    });
  });
});