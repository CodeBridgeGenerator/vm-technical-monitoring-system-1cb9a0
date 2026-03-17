const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("memWarehouses service", async () => {
  let thisService;
  let memWarehouseCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("memWarehouses");

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
    assert.ok(thisService, "Registered the service (memWarehouses)");
  });

  describe("#create", () => {
    const options = {"name":"new value","locataion":"new value","ownership":"parentObjectId"};

    beforeEach(async () => {
      memWarehouseCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new memWarehouse", () => {
      assert.strictEqual(memWarehouseCreated.name, options.name);
assert.strictEqual(memWarehouseCreated.locataion, options.locataion);
assert.strictEqual(memWarehouseCreated.ownership.toString(), options.ownership.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a memWarehouse by ID", async () => {
      const retrieved = await thisService.Model.findById(memWarehouseCreated._id);
      assert.strictEqual(retrieved._id.toString(), memWarehouseCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","locataion":"updated value","ownership":`${branchesCreated._id}`};

    it("should update an existing memWarehouse ", async () => {
      const memWarehouseUpdated = await thisService.Model.findByIdAndUpdate(
        memWarehouseCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(memWarehouseUpdated.name, options.name);
assert.strictEqual(memWarehouseUpdated.locataion, options.locataion);
assert.strictEqual(memWarehouseUpdated.ownership.toString(), options.ownership.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a memWarehouse", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const memWarehouseDeleted = await thisService.Model.findByIdAndDelete(memWarehouseCreated._id);
      assert.strictEqual(memWarehouseDeleted._id.toString(), memWarehouseCreated._id.toString());
    });
  });
});