const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("memWarehouseParts service", async () => {
  let thisService;
  let memWarehousePartCreated;
  let usersServiceResults;
  let users;

  const memPartsCreated = await app.service("memParts").Model.create({"part":"parentObjectId","item":"new value"});
const warehouseMasterCreated = await app.service("warehouseMaster").Model.create({"part":`${memPartsCreated._id}`,"item":"new value","warehouse":"parentObjectId","name":"new value","location":"new value"});

  beforeEach(async () => {
    thisService = await app.service("memWarehouseParts");

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
    assert.ok(thisService, "Registered the service (memWarehouseParts)");
  });

  describe("#create", () => {
    const options = {"part":`${memPartsCreated._id}`,"item":"new value","warehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","quantity":23,"costAmount":23,"reorderingQuantity":23,"reorderingPoint":23};

    beforeEach(async () => {
      memWarehousePartCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new memWarehousePart", () => {
      assert.strictEqual(memWarehousePartCreated.part.toString(), options.part.toString());
assert.strictEqual(memWarehousePartCreated.warehouse.toString(), options.warehouse.toString());
assert.strictEqual(memWarehousePartCreated.quantity, options.quantity);
assert.strictEqual(memWarehousePartCreated.costAmount, options.costAmount);
assert.strictEqual(memWarehousePartCreated.reorderingQuantity, options.reorderingQuantity);
assert.strictEqual(memWarehousePartCreated.reorderingPoint, options.reorderingPoint);
    });
  });

  describe("#get", () => {
    it("should retrieve a memWarehousePart by ID", async () => {
      const retrieved = await thisService.Model.findById(memWarehousePartCreated._id);
      assert.strictEqual(retrieved._id.toString(), memWarehousePartCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"part":`${memPartsCreated._id}`,"warehouse":`${warehouseMasterCreated._id}`,"quantity":100,"costAmount":100,"reorderingQuantity":100,"reorderingPoint":100};

    it("should update an existing memWarehousePart ", async () => {
      const memWarehousePartUpdated = await thisService.Model.findByIdAndUpdate(
        memWarehousePartCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(memWarehousePartUpdated.part.toString(), options.part.toString());
assert.strictEqual(memWarehousePartUpdated.warehouse.toString(), options.warehouse.toString());
assert.strictEqual(memWarehousePartUpdated.quantity, options.quantity);
assert.strictEqual(memWarehousePartUpdated.costAmount, options.costAmount);
assert.strictEqual(memWarehousePartUpdated.reorderingQuantity, options.reorderingQuantity);
assert.strictEqual(memWarehousePartUpdated.reorderingPoint, options.reorderingPoint);
    });
  });

  describe("#delete", async () => {
    it("should delete a memWarehousePart", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("memParts").Model.findByIdAndDelete(memPartsCreated._id);
await app.service("warehouseMaster").Model.findByIdAndDelete(warehouseMasterCreated._id);;

      const memWarehousePartDeleted = await thisService.Model.findByIdAndDelete(memWarehousePartCreated._id);
      assert.strictEqual(memWarehousePartDeleted._id.toString(), memWarehousePartCreated._id.toString());
    });
  });
});