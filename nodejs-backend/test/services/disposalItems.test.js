const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("disposalItems service", async () => {
  let thisService;
  let disposalItemCreated;
  let usersServiceResults;
  let users;

  const warehouseMasterCreated = await app.service("warehouseMaster").Model.create({"associatedNo":"parentObjectId","sourceWarehouse":"parentObjectId","name":"new value","location":"new value"});
const partsMasterCreated = await app.service("partsMaster").Model.create({"associatedNo":"parentObjectId","sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","partNumber":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23});
const disposalDetailsCreated = await app.service("disposalDetails").Model.create({"associatedNo":"parentObjectId","sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","partNumber":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"associatedNumber":"new value","affectiveDate":"2026-03-17T15:06:12.109Z"});
const partsMasterCreated = await app.service("partsMaster").Model.create({"associatedNo":`${disposalDetailsCreated._id}`,"sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","partNumber":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"associatedNumber":"new value","affectiveDate":"2026-03-17T15:06:12.109Z","part":"parentObjectId"});

  beforeEach(async () => {
    thisService = await app.service("disposalItems");

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
    assert.ok(thisService, "Registered the service (disposalItems)");
  });

  describe("#create", () => {
    const options = {"associatedNo":`${disposalDetailsCreated._id}`,"sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","partNumber":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"associatedNumber":"new value","affectiveDate":"2026-03-17T15:06:12.109Z","part":`${partsMasterCreated._id}`};

    beforeEach(async () => {
      disposalItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new disposalItem", () => {
      assert.strictEqual(disposalItemCreated.associatedNo.toString(), options.associatedNo.toString());
assert.strictEqual(disposalItemCreated.part.toString(), options.part.toString());
assert.strictEqual(disposalItemCreated.quantity, options.quantity);
    });
  });

  describe("#get", () => {
    it("should retrieve a disposalItem by ID", async () => {
      const retrieved = await thisService.Model.findById(disposalItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), disposalItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"associatedNo":`${disposalDetailsCreated._id}`,"part":`${partsMasterCreated._id}`,"quantity":100};

    it("should update an existing disposalItem ", async () => {
      const disposalItemUpdated = await thisService.Model.findByIdAndUpdate(
        disposalItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(disposalItemUpdated.associatedNo.toString(), options.associatedNo.toString());
assert.strictEqual(disposalItemUpdated.part.toString(), options.part.toString());
assert.strictEqual(disposalItemUpdated.quantity, options.quantity);
    });
  });

  describe("#delete", async () => {
    it("should delete a disposalItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("warehouseMaster").Model.findByIdAndDelete(warehouseMasterCreated._id);
await app.service("partsMaster").Model.findByIdAndDelete(partsMasterCreated._id);
await app.service("disposalDetails").Model.findByIdAndDelete(disposalDetailsCreated._id);;

      const disposalItemDeleted = await thisService.Model.findByIdAndDelete(disposalItemCreated._id);
      assert.strictEqual(disposalItemDeleted._id.toString(), disposalItemCreated._id.toString());
    });
  });
});