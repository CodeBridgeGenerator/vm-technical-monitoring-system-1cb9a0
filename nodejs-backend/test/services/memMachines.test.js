const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("memMachines service", async () => {
  let thisService;
  let memMachineCreated;
  let usersServiceResults;
  let users;

  const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":"parentObjectId","name":"new value","description":"new value"});

  beforeEach(async () => {
    thisService = await app.service("memMachines");

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
    assert.ok(thisService, "Registered the service (memMachines)");
  });

  describe("#create", () => {
    const options = {"ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":`${vendingMachinesCreated._id}`,"name":"new value","description":"new value","comissionDate":"2026-03-17T15:06:12.163Z"};

    beforeEach(async () => {
      memMachineCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new memMachine", () => {
      assert.strictEqual(memMachineCreated.ownership.toString(), options.ownership.toString());
assert.strictEqual(memMachineCreated.vendingMachineCode, options.vendingMachineCode);
assert.strictEqual(memMachineCreated.modelNo, options.modelNo);
assert.strictEqual(memMachineCreated.serialNumber, options.serialNumber);
assert.strictEqual(memMachineCreated.vendingMachineType.toString(), options.vendingMachineType.toString());
assert.strictEqual(memMachineCreated.comissionDate.toISOString(), options.comissionDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a memMachine by ID", async () => {
      const retrieved = await thisService.Model.findById(memMachineCreated._id);
      assert.strictEqual(retrieved._id.toString(), memMachineCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"ownership":`${branchesCreated._id}`,"vendingMachineCode":"updated value","modelNo":"updated value","serialNumber":"updated value","vendingMachineType":`${vendingMachinesCreated._id}`,"comissionDate":"2026-03-17T15:06:12.163Z"};

    it("should update an existing memMachine ", async () => {
      const memMachineUpdated = await thisService.Model.findByIdAndUpdate(
        memMachineCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(memMachineUpdated.ownership.toString(), options.ownership.toString());
assert.strictEqual(memMachineUpdated.vendingMachineCode, options.vendingMachineCode);
assert.strictEqual(memMachineUpdated.modelNo, options.modelNo);
assert.strictEqual(memMachineUpdated.serialNumber, options.serialNumber);
assert.strictEqual(memMachineUpdated.vendingMachineType.toString(), options.vendingMachineType.toString());
assert.strictEqual(memMachineUpdated.comissionDate.toISOString(), options.comissionDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a memMachine", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);;

      const memMachineDeleted = await thisService.Model.findByIdAndDelete(memMachineCreated._id);
      assert.strictEqual(memMachineDeleted._id.toString(), memMachineCreated._id.toString());
    });
  });
});