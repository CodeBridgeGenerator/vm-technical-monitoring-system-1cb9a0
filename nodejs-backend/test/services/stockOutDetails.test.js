const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("stockOutDetails service", async () => {
  let thisService;
  let stockOutDetailCreated;
  let usersServiceResults;
  let users;

  const partsMasterCreated = await app.service("partsMaster").Model.create({"partName":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23});

  beforeEach(async () => {
    thisService = await app.service("stockOutDetails");

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
    assert.ok(thisService, "Registered the service (stockOutDetails)");
  });

  describe("#create", () => {
    const options = {"partName":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"stockOutType":"new value","associatedOrderNumber":"new value","conditionOfItems":"new value"};

    beforeEach(async () => {
      stockOutDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new stockOutDetail", () => {
      assert.strictEqual(stockOutDetailCreated.partName.toString(), options.partName.toString());
assert.strictEqual(stockOutDetailCreated.stockOutType, options.stockOutType);
assert.strictEqual(stockOutDetailCreated.associatedOrderNumber, options.associatedOrderNumber);
assert.strictEqual(stockOutDetailCreated.conditionOfItems, options.conditionOfItems);
    });
  });

  describe("#get", () => {
    it("should retrieve a stockOutDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(stockOutDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), stockOutDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"partName":`${partsMasterCreated._id}`,"stockOutType":"updated value","associatedOrderNumber":"updated value","conditionOfItems":"updated value"};

    it("should update an existing stockOutDetail ", async () => {
      const stockOutDetailUpdated = await thisService.Model.findByIdAndUpdate(
        stockOutDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(stockOutDetailUpdated.partName.toString(), options.partName.toString());
assert.strictEqual(stockOutDetailUpdated.stockOutType, options.stockOutType);
assert.strictEqual(stockOutDetailUpdated.associatedOrderNumber, options.associatedOrderNumber);
assert.strictEqual(stockOutDetailUpdated.conditionOfItems, options.conditionOfItems);
    });
  });

  describe("#delete", async () => {
    it("should delete a stockOutDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("partsMaster").Model.findByIdAndDelete(partsMasterCreated._id);;

      const stockOutDetailDeleted = await thisService.Model.findByIdAndDelete(stockOutDetailCreated._id);
      assert.strictEqual(stockOutDetailDeleted._id.toString(), stockOutDetailCreated._id.toString());
    });
  });
});