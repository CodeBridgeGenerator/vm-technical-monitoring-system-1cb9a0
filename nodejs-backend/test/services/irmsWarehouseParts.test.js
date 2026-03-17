const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("irmsWarehouseParts service", async () => {
  let thisService;
  let irmsWarehousePartCreated;
  let usersServiceResults;
  let users;

  const irmsPartsCreated = await app.service("irmsParts").Model.create({"part":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value"});
const warehouseMasterCreated = await app.service("warehouseMaster").Model.create({"part":`${irmsPartsCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","warehouse":"parentObjectId","name":"new value","location":"new value"});

  beforeEach(async () => {
    thisService = await app.service("irmsWarehouseParts");

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
    assert.ok(thisService, "Registered the service (irmsWarehouseParts)");
  });

  describe("#create", () => {
    const options = {"part":`${irmsPartsCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","warehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value","quantity":23,"costAmount":23,"reorderingQuantity":23,"reorderingPoint":23};

    beforeEach(async () => {
      irmsWarehousePartCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new irmsWarehousePart", () => {
      assert.strictEqual(irmsWarehousePartCreated.part.toString(), options.part.toString());
assert.strictEqual(irmsWarehousePartCreated.warehouse.toString(), options.warehouse.toString());
assert.strictEqual(irmsWarehousePartCreated.quantity, options.quantity);
assert.strictEqual(irmsWarehousePartCreated.costAmount, options.costAmount);
assert.strictEqual(irmsWarehousePartCreated.reorderingQuantity, options.reorderingQuantity);
assert.strictEqual(irmsWarehousePartCreated.reorderingPoint, options.reorderingPoint);
    });
  });

  describe("#get", () => {
    it("should retrieve a irmsWarehousePart by ID", async () => {
      const retrieved = await thisService.Model.findById(irmsWarehousePartCreated._id);
      assert.strictEqual(retrieved._id.toString(), irmsWarehousePartCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"part":`${irmsPartsCreated._id}`,"warehouse":`${warehouseMasterCreated._id}`,"quantity":100,"costAmount":100,"reorderingQuantity":100,"reorderingPoint":100};

    it("should update an existing irmsWarehousePart ", async () => {
      const irmsWarehousePartUpdated = await thisService.Model.findByIdAndUpdate(
        irmsWarehousePartCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(irmsWarehousePartUpdated.part.toString(), options.part.toString());
assert.strictEqual(irmsWarehousePartUpdated.warehouse.toString(), options.warehouse.toString());
assert.strictEqual(irmsWarehousePartUpdated.quantity, options.quantity);
assert.strictEqual(irmsWarehousePartUpdated.costAmount, options.costAmount);
assert.strictEqual(irmsWarehousePartUpdated.reorderingQuantity, options.reorderingQuantity);
assert.strictEqual(irmsWarehousePartUpdated.reorderingPoint, options.reorderingPoint);
    });
  });

  describe("#delete", async () => {
    it("should delete a irmsWarehousePart", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("irmsParts").Model.findByIdAndDelete(irmsPartsCreated._id);
await app.service("warehouseMaster").Model.findByIdAndDelete(warehouseMasterCreated._id);;

      const irmsWarehousePartDeleted = await thisService.Model.findByIdAndDelete(irmsWarehousePartCreated._id);
      assert.strictEqual(irmsWarehousePartDeleted._id.toString(), irmsWarehousePartCreated._id.toString());
    });
  });
});