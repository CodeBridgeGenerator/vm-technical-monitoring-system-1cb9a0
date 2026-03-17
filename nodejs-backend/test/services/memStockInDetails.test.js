const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("memStockInDetails service", async () => {
  let thisService;
  let memStockInDetailCreated;
  let usersServiceResults;
  let users;

  const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"vmCode":"parentObjectId","ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":"parentObjectId","name":"new value","description":"new value"});
const atlasMachinesCreated = await app.service("atlasMachines").Model.create({"vmCode":"parentObjectId","ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":`${vendingMachinesCreated._id}`,"name":"new value","description":"new value","commissionDate":"2026-03-17T15:06:12.292Z"});
const memWarehousesCreated = await app.service("memWarehouses").Model.create({"vmCode":`${atlasMachinesCreated._id}`,"ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":`${vendingMachinesCreated._id}`,"name":"new value","description":"new value","commissionDate":"2026-03-17T15:06:12.292Z","pricing":23,"quantity":23,"purchaseDate":"2026-03-17T15:06:12.292Z","partDescription":"new value","poNumber":"new value","doNumber":"new value","category":"new value","unitOfMeasurement":"new value","conditionOfTerms":"new value","warehouse":"parentObjectId","locataion":"new value"});

  beforeEach(async () => {
    thisService = await app.service("memStockInDetails");

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
    assert.ok(thisService, "Registered the service (memStockInDetails)");
  });

  describe("#create", () => {
    const options = {"vmCode":`${atlasMachinesCreated._id}`,"ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":`${vendingMachinesCreated._id}`,"name":"new value","description":"new value","commissionDate":"2026-03-17T15:06:12.292Z","pricing":23,"quantity":23,"purchaseDate":"2026-03-17T15:06:12.292Z","partDescription":"new value","poNumber":"new value","doNumber":"new value","category":"new value","unitOfMeasurement":"new value","conditionOfTerms":"new value","warehouse":`${memWarehousesCreated._id}`,"locataion":"new value"};

    beforeEach(async () => {
      memStockInDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new memStockInDetail", () => {
      assert.strictEqual(memStockInDetailCreated.vmCode.toString(), options.vmCode.toString());
assert.strictEqual(memStockInDetailCreated.pricing, options.pricing);
assert.strictEqual(memStockInDetailCreated.quantity, options.quantity);
assert.strictEqual(memStockInDetailCreated.purchaseDate.toISOString(), options.purchaseDate);
assert.strictEqual(memStockInDetailCreated.partDescription, options.partDescription);
assert.strictEqual(memStockInDetailCreated.poNumber, options.poNumber);
assert.strictEqual(memStockInDetailCreated.doNumber, options.doNumber);
assert.strictEqual(memStockInDetailCreated.category, options.category);
assert.strictEqual(memStockInDetailCreated.unitOfMeasurement, options.unitOfMeasurement);
assert.strictEqual(memStockInDetailCreated.conditionOfTerms, options.conditionOfTerms);
assert.strictEqual(memStockInDetailCreated.warehouse.toString(), options.warehouse.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a memStockInDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(memStockInDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), memStockInDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"vmCode":`${atlasMachinesCreated._id}`,"pricing":100,"quantity":100,"purchaseDate":"2026-03-17T15:06:12.292Z","partDescription":"updated value","poNumber":"updated value","doNumber":"updated value","category":"updated value","unitOfMeasurement":"updated value","conditionOfTerms":"updated value","warehouse":`${memWarehousesCreated._id}`};

    it("should update an existing memStockInDetail ", async () => {
      const memStockInDetailUpdated = await thisService.Model.findByIdAndUpdate(
        memStockInDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(memStockInDetailUpdated.vmCode.toString(), options.vmCode.toString());
assert.strictEqual(memStockInDetailUpdated.pricing, options.pricing);
assert.strictEqual(memStockInDetailUpdated.quantity, options.quantity);
assert.strictEqual(memStockInDetailUpdated.purchaseDate.toISOString(), options.purchaseDate);
assert.strictEqual(memStockInDetailUpdated.partDescription, options.partDescription);
assert.strictEqual(memStockInDetailUpdated.poNumber, options.poNumber);
assert.strictEqual(memStockInDetailUpdated.doNumber, options.doNumber);
assert.strictEqual(memStockInDetailUpdated.category, options.category);
assert.strictEqual(memStockInDetailUpdated.unitOfMeasurement, options.unitOfMeasurement);
assert.strictEqual(memStockInDetailUpdated.conditionOfTerms, options.conditionOfTerms);
assert.strictEqual(memStockInDetailUpdated.warehouse.toString(), options.warehouse.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a memStockInDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);
await app.service("atlasMachines").Model.findByIdAndDelete(atlasMachinesCreated._id);
await app.service("memWarehouses").Model.findByIdAndDelete(memWarehousesCreated._id);;

      const memStockInDetailDeleted = await thisService.Model.findByIdAndDelete(memStockInDetailCreated._id);
      assert.strictEqual(memStockInDetailDeleted._id.toString(), memStockInDetailCreated._id.toString());
    });
  });
});