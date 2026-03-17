const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("disposalDetails service", async () => {
  let thisService;
  let disposalDetailCreated;
  let usersServiceResults;
  let users;

  const warehouseMasterCreated = await app.service("warehouseMaster").Model.create({"sourceWarehouse":"parentObjectId","name":"new value","location":"new value"});
const partsMasterCreated = await app.service("partsMaster").Model.create({"sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","partNumber":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23});

  beforeEach(async () => {
    thisService = await app.service("disposalDetails");

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
    assert.ok(thisService, "Registered the service (disposalDetails)");
  });

  describe("#create", () => {
    const options = {"sourceWarehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","partNumber":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"associatedNumber":"new value","affectiveDate":"2026-03-17T15:06:11.831Z"};

    beforeEach(async () => {
      disposalDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new disposalDetail", () => {
      assert.strictEqual(disposalDetailCreated.sourceWarehouse.toString(), options.sourceWarehouse.toString());
assert.strictEqual(disposalDetailCreated.partNumber.toString(), options.partNumber.toString());
assert.strictEqual(disposalDetailCreated.quantity, options.quantity);
assert.strictEqual(disposalDetailCreated.associatedNumber, options.associatedNumber);
assert.strictEqual(disposalDetailCreated.affectiveDate.toISOString(), options.affectiveDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a disposalDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(disposalDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), disposalDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"sourceWarehouse":`${warehouseMasterCreated._id}`,"partNumber":`${partsMasterCreated._id}`,"quantity":100,"associatedNumber":"updated value","affectiveDate":"2026-03-17T15:06:11.831Z"};

    it("should update an existing disposalDetail ", async () => {
      const disposalDetailUpdated = await thisService.Model.findByIdAndUpdate(
        disposalDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(disposalDetailUpdated.sourceWarehouse.toString(), options.sourceWarehouse.toString());
assert.strictEqual(disposalDetailUpdated.partNumber.toString(), options.partNumber.toString());
assert.strictEqual(disposalDetailUpdated.quantity, options.quantity);
assert.strictEqual(disposalDetailUpdated.associatedNumber, options.associatedNumber);
assert.strictEqual(disposalDetailUpdated.affectiveDate.toISOString(), options.affectiveDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a disposalDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("warehouseMaster").Model.findByIdAndDelete(warehouseMasterCreated._id);
await app.service("partsMaster").Model.findByIdAndDelete(partsMasterCreated._id);;

      const disposalDetailDeleted = await thisService.Model.findByIdAndDelete(disposalDetailCreated._id);
      assert.strictEqual(disposalDetailDeleted._id.toString(), disposalDetailCreated._id.toString());
    });
  });
});