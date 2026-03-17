const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("memTransferDetails service", async () => {
  let thisService;
  let memTransferDetailCreated;
  let usersServiceResults;
  let users;

  const memWarehousesCreated = await app.service("memWarehouses").Model.create({"sourceWarehouse":"parentObjectId","name":"new value","locataion":"new value","ownership":"parentObjectId"});
const memWarehousesCreated = await app.service("memWarehouses").Model.create({"sourceWarehouse":`${memWarehousesCreated._id}`,"name":"new value","locataion":"new value","ownership":"parentObjectId","destinationWarehouse":"parentObjectId"});

  beforeEach(async () => {
    thisService = await app.service("memTransferDetails");

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
    assert.ok(thisService, "Registered the service (memTransferDetails)");
  });

  describe("#create", () => {
    const options = {"sourceWarehouse":`${memWarehousesCreated._id}`,"name":"new value","locataion":"new value","ownership":"parentObjectId","destinationWarehouse":`${memWarehousesCreated._id}`,"transferDate":"2026-03-17T15:06:12.349Z","transferStatus":"new value","deliveryAddress":"new value","transferDocuments":"new value"};

    beforeEach(async () => {
      memTransferDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new memTransferDetail", () => {
      assert.strictEqual(memTransferDetailCreated.sourceWarehouse.toString(), options.sourceWarehouse.toString());
assert.strictEqual(memTransferDetailCreated.destinationWarehouse.toString(), options.destinationWarehouse.toString());
assert.strictEqual(memTransferDetailCreated.transferDate.toISOString(), options.transferDate);
assert.strictEqual(memTransferDetailCreated.transferStatus, options.transferStatus);
assert.strictEqual(memTransferDetailCreated.deliveryAddress, options.deliveryAddress);
assert.strictEqual(memTransferDetailCreated.transferDocuments, options.transferDocuments);
    });
  });

  describe("#get", () => {
    it("should retrieve a memTransferDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(memTransferDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), memTransferDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"sourceWarehouse":`${memWarehousesCreated._id}`,"destinationWarehouse":`${memWarehousesCreated._id}`,"transferDate":"2026-03-17T15:06:12.349Z","transferStatus":"updated value","deliveryAddress":"updated value","transferDocuments":"updated value"};

    it("should update an existing memTransferDetail ", async () => {
      const memTransferDetailUpdated = await thisService.Model.findByIdAndUpdate(
        memTransferDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(memTransferDetailUpdated.sourceWarehouse.toString(), options.sourceWarehouse.toString());
assert.strictEqual(memTransferDetailUpdated.destinationWarehouse.toString(), options.destinationWarehouse.toString());
assert.strictEqual(memTransferDetailUpdated.transferDate.toISOString(), options.transferDate);
assert.strictEqual(memTransferDetailUpdated.transferStatus, options.transferStatus);
assert.strictEqual(memTransferDetailUpdated.deliveryAddress, options.deliveryAddress);
assert.strictEqual(memTransferDetailUpdated.transferDocuments, options.transferDocuments);
    });
  });

  describe("#delete", async () => {
    it("should delete a memTransferDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("memWarehouses").Model.findByIdAndDelete(memWarehousesCreated._id);;

      const memTransferDetailDeleted = await thisService.Model.findByIdAndDelete(memTransferDetailCreated._id);
      assert.strictEqual(memTransferDetailDeleted._id.toString(), memTransferDetailCreated._id.toString());
    });
  });
});