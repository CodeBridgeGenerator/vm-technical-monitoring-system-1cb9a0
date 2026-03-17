const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("sampleItems service", async () => {
  let thisService;
  let sampleItemCreated;
  let usersServiceResults;
  let users;

  const warehouseMasterCreated = await app.service("warehouseMaster").Model.create({"associatedNo":"parentObjectId","sourceWarehouse":"parentObjectId","name":"new value","location":"new value"});
const partsMasterCreated = await app.service("partsMaster").Model.create({"associatedNo":"parentObjectId","sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","partNumber":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23});
const sampleDetailsCreated = await app.service("sampleDetails").Model.create({"associatedNo":"parentObjectId","sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","partNumber":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"associatedNumber":"new value","affectiveDate":"2026-03-17T15:06:12.125Z"});
const partsMasterCreated = await app.service("partsMaster").Model.create({"associatedNo":`${sampleDetailsCreated._id}`,"sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","partNumber":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"associatedNumber":"new value","affectiveDate":"2026-03-17T15:06:12.125Z","part":"parentObjectId"});

  beforeEach(async () => {
    thisService = await app.service("sampleItems");

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
    assert.ok(thisService, "Registered the service (sampleItems)");
  });

  describe("#create", () => {
    const options = {"associatedNo":`${sampleDetailsCreated._id}`,"sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","partNumber":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"associatedNumber":"new value","affectiveDate":"2026-03-17T15:06:12.125Z","part":`${partsMasterCreated._id}`};

    beforeEach(async () => {
      sampleItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new sampleItem", () => {
      assert.strictEqual(sampleItemCreated.associatedNo.toString(), options.associatedNo.toString());
assert.strictEqual(sampleItemCreated.part.toString(), options.part.toString());
assert.strictEqual(sampleItemCreated.quantity, options.quantity);
    });
  });

  describe("#get", () => {
    it("should retrieve a sampleItem by ID", async () => {
      const retrieved = await thisService.Model.findById(sampleItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), sampleItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"associatedNo":`${sampleDetailsCreated._id}`,"part":`${partsMasterCreated._id}`,"quantity":100};

    it("should update an existing sampleItem ", async () => {
      const sampleItemUpdated = await thisService.Model.findByIdAndUpdate(
        sampleItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(sampleItemUpdated.associatedNo.toString(), options.associatedNo.toString());
assert.strictEqual(sampleItemUpdated.part.toString(), options.part.toString());
assert.strictEqual(sampleItemUpdated.quantity, options.quantity);
    });
  });

  describe("#delete", async () => {
    it("should delete a sampleItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("warehouseMaster").Model.findByIdAndDelete(warehouseMasterCreated._id);
await app.service("partsMaster").Model.findByIdAndDelete(partsMasterCreated._id);
await app.service("sampleDetails").Model.findByIdAndDelete(sampleDetailsCreated._id);;

      const sampleItemDeleted = await thisService.Model.findByIdAndDelete(sampleItemCreated._id);
      assert.strictEqual(sampleItemDeleted._id.toString(), sampleItemCreated._id.toString());
    });
  });
});