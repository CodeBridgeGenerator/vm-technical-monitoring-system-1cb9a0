const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("memStockOutDetails service", async () => {
  let thisService;
  let memStockOutDetailCreated;
  let usersServiceResults;
  let users;

  const memPartsCreated = await app.service("memParts").Model.create({"partName":"parentObjectId","item":"new value"});

  beforeEach(async () => {
    thisService = await app.service("memStockOutDetails");

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
    assert.ok(thisService, "Registered the service (memStockOutDetails)");
  });

  describe("#create", () => {
    const options = {"partName":`${memPartsCreated._id}`,"item":"new value","quantity":23,"stockOutType":"new value","associatedOrderNumber":"new value","conditionOfItems":"new value","stockOutDate":"2026-03-17T15:06:12.331Z"};

    beforeEach(async () => {
      memStockOutDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new memStockOutDetail", () => {
      assert.strictEqual(memStockOutDetailCreated.partName.toString(), options.partName.toString());
assert.strictEqual(memStockOutDetailCreated.quantity, options.quantity);
assert.strictEqual(memStockOutDetailCreated.stockOutType, options.stockOutType);
assert.strictEqual(memStockOutDetailCreated.associatedOrderNumber, options.associatedOrderNumber);
assert.strictEqual(memStockOutDetailCreated.conditionOfItems, options.conditionOfItems);
assert.strictEqual(memStockOutDetailCreated.stockOutDate.toISOString(), options.stockOutDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a memStockOutDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(memStockOutDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), memStockOutDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"partName":`${memPartsCreated._id}`,"quantity":100,"stockOutType":"updated value","associatedOrderNumber":"updated value","conditionOfItems":"updated value","stockOutDate":"2026-03-17T15:06:12.331Z"};

    it("should update an existing memStockOutDetail ", async () => {
      const memStockOutDetailUpdated = await thisService.Model.findByIdAndUpdate(
        memStockOutDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(memStockOutDetailUpdated.partName.toString(), options.partName.toString());
assert.strictEqual(memStockOutDetailUpdated.quantity, options.quantity);
assert.strictEqual(memStockOutDetailUpdated.stockOutType, options.stockOutType);
assert.strictEqual(memStockOutDetailUpdated.associatedOrderNumber, options.associatedOrderNumber);
assert.strictEqual(memStockOutDetailUpdated.conditionOfItems, options.conditionOfItems);
assert.strictEqual(memStockOutDetailUpdated.stockOutDate.toISOString(), options.stockOutDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a memStockOutDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("memParts").Model.findByIdAndDelete(memPartsCreated._id);;

      const memStockOutDetailDeleted = await thisService.Model.findByIdAndDelete(memStockOutDetailCreated._id);
      assert.strictEqual(memStockOutDetailDeleted._id.toString(), memStockOutDetailCreated._id.toString());
    });
  });
});