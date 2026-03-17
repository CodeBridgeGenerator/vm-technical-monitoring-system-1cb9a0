const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("memTransferItems service", async () => {
  let thisService;
  let memTransferItemCreated;
  let usersServiceResults;
  let users;

  const memWarehousesCreated = await app.service("memWarehouses").Model.create({"transferDate":"parentObjectId","sourceWarehouse":"parentObjectId","name":"new value","locataion":"new value","ownership":"parentObjectId"});
const memWarehousesCreated = await app.service("memWarehouses").Model.create({"transferDate":"parentObjectId","sourceWarehouse":`${memWarehousesCreated._id}`,"name":"new value","locataion":"new value","ownership":"parentObjectId","destinationWarehouse":"parentObjectId"});
const memTransferDetailsCreated = await app.service("memTransferDetails").Model.create({"transferDate":"2026-03-17T15:06:12.385Z","sourceWarehouse":`${memWarehousesCreated._id}`,"name":"new value","locataion":"new value","ownership":"parentObjectId","destinationWarehouse":`${memWarehousesCreated._id}`,"transferStatus":"new value","deliveryAddress":"new value","transferDocuments":"new value"});
const memPartsCreated = await app.service("memParts").Model.create({"transferDate":`${memTransferDetailsCreated._id}`,"sourceWarehouse":`${memWarehousesCreated._id}`,"name":"new value","locataion":"new value","ownership":"parentObjectId","destinationWarehouse":`${memWarehousesCreated._id}`,"transferStatus":"new value","deliveryAddress":"new value","transferDocuments":"new value","part":"parentObjectId","item":"new value"});
const warehouseMasterCreated = await app.service("warehouseMaster").Model.create({"transferDate":`${memTransferDetailsCreated._id}`,"sourceWarehouse":`${memWarehousesCreated._id}`,"name":"new value","locataion":"new value","ownership":"parentObjectId","destinationWarehouse":`${memWarehousesCreated._id}`,"transferStatus":"new value","deliveryAddress":"new value","transferDocuments":"new value","part":`${memPartsCreated._id}`,"item":"new value","warehouse":"parentObjectId","location":"new value"});
const memWarehousePartsCreated = await app.service("memWarehouseParts").Model.create({"transferDate":`${memTransferDetailsCreated._id}`,"sourceWarehouse":`${memWarehousesCreated._id}`,"name":"new value","locataion":"new value","ownership":"parentObjectId","destinationWarehouse":`${memWarehousesCreated._id}`,"transferStatus":"new value","deliveryAddress":"new value","transferDocuments":"new value","part":`${memPartsCreated._id}`,"item":"new value","warehouse":`${warehouseMasterCreated._id}`,"location":"new value","quantity":23,"costAmount":23,"reorderingQuantity":23,"reorderingPoint":23});

  beforeEach(async () => {
    thisService = await app.service("memTransferItems");

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
    assert.ok(thisService, "Registered the service (memTransferItems)");
  });

  describe("#create", () => {
    const options = {"transferDate":`${memTransferDetailsCreated._id}`,"sourceWarehouse":`${memWarehousesCreated._id}`,"name":"new value","locataion":"new value","ownership":"parentObjectId","destinationWarehouse":`${memWarehousesCreated._id}`,"transferStatus":"new value","deliveryAddress":"new value","transferDocuments":"new value","part":`${memWarehousePartsCreated._id}`,"item":"new value","warehouse":`${warehouseMasterCreated._id}`,"location":"new value","quantity":23,"costAmount":23,"reorderingQuantity":23,"reorderingPoint":23};

    beforeEach(async () => {
      memTransferItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new memTransferItem", () => {
      assert.strictEqual(memTransferItemCreated.transferDate.toString(), options.transferDate.toString());
assert.strictEqual(memTransferItemCreated.part.toString(), options.part.toString());
assert.strictEqual(memTransferItemCreated.quantity, options.quantity);
    });
  });

  describe("#get", () => {
    it("should retrieve a memTransferItem by ID", async () => {
      const retrieved = await thisService.Model.findById(memTransferItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), memTransferItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"transferDate":`${memTransferDetailsCreated._id}`,"part":`${memWarehousePartsCreated._id}`,"quantity":100};

    it("should update an existing memTransferItem ", async () => {
      const memTransferItemUpdated = await thisService.Model.findByIdAndUpdate(
        memTransferItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(memTransferItemUpdated.transferDate.toString(), options.transferDate.toString());
assert.strictEqual(memTransferItemUpdated.part.toString(), options.part.toString());
assert.strictEqual(memTransferItemUpdated.quantity, options.quantity);
    });
  });

  describe("#delete", async () => {
    it("should delete a memTransferItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("memWarehouses").Model.findByIdAndDelete(memWarehousesCreated._id);
await app.service("memTransferDetails").Model.findByIdAndDelete(memTransferDetailsCreated._id);
await app.service("memParts").Model.findByIdAndDelete(memPartsCreated._id);
await app.service("warehouseMaster").Model.findByIdAndDelete(warehouseMasterCreated._id);
await app.service("memWarehouseParts").Model.findByIdAndDelete(memWarehousePartsCreated._id);;

      const memTransferItemDeleted = await thisService.Model.findByIdAndDelete(memTransferItemCreated._id);
      assert.strictEqual(memTransferItemDeleted._id.toString(), memTransferItemCreated._id.toString());
    });
  });
});