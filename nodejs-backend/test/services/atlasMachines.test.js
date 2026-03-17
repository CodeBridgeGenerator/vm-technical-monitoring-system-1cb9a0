const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("atlasMachines service", async () => {
  let thisService;
  let atlasMachineCreated;
  let usersServiceResults;
  let users;

  const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":"parentObjectId","name":"new value","description":"new value"});

  beforeEach(async () => {
    thisService = await app.service("atlasMachines");

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
    assert.ok(thisService, "Registered the service (atlasMachines)");
  });

  describe("#create", () => {
    const options = {"ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":`${vendingMachinesCreated._id}`,"name":"new value","description":"new value","commissionDate":"2026-03-17T15:06:11.976Z"};

    beforeEach(async () => {
      atlasMachineCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new atlasMachine", () => {
      assert.strictEqual(atlasMachineCreated.ownership.toString(), options.ownership.toString());
assert.strictEqual(atlasMachineCreated.vendingMachineCode, options.vendingMachineCode);
assert.strictEqual(atlasMachineCreated.modelNo, options.modelNo);
assert.strictEqual(atlasMachineCreated.serialNumber, options.serialNumber);
assert.strictEqual(atlasMachineCreated.vendingMachineType.toString(), options.vendingMachineType.toString());
assert.strictEqual(atlasMachineCreated.commissionDate.toISOString(), options.commissionDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a atlasMachine by ID", async () => {
      const retrieved = await thisService.Model.findById(atlasMachineCreated._id);
      assert.strictEqual(retrieved._id.toString(), atlasMachineCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"ownership":`${branchesCreated._id}`,"vendingMachineCode":"updated value","modelNo":"updated value","serialNumber":"updated value","vendingMachineType":`${vendingMachinesCreated._id}`,"commissionDate":"2026-03-17T15:06:11.976Z"};

    it("should update an existing atlasMachine ", async () => {
      const atlasMachineUpdated = await thisService.Model.findByIdAndUpdate(
        atlasMachineCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(atlasMachineUpdated.ownership.toString(), options.ownership.toString());
assert.strictEqual(atlasMachineUpdated.vendingMachineCode, options.vendingMachineCode);
assert.strictEqual(atlasMachineUpdated.modelNo, options.modelNo);
assert.strictEqual(atlasMachineUpdated.serialNumber, options.serialNumber);
assert.strictEqual(atlasMachineUpdated.vendingMachineType.toString(), options.vendingMachineType.toString());
assert.strictEqual(atlasMachineUpdated.commissionDate.toISOString(), options.commissionDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a atlasMachine", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);;

      const atlasMachineDeleted = await thisService.Model.findByIdAndDelete(atlasMachineCreated._id);
      assert.strictEqual(atlasMachineDeleted._id.toString(), atlasMachineCreated._id.toString());
    });
  });
});