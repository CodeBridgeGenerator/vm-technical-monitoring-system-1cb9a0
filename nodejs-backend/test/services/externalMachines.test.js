const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("externalMachines service", async () => {
  let thisService;
  let externalMachineCreated;
  let usersServiceResults;
  let users;

  const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":"parentObjectId","name":"new value","description":"new value"});

  beforeEach(async () => {
    thisService = await app.service("externalMachines");

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
    assert.ok(thisService, "Registered the service (externalMachines)");
  });

  describe("#create", () => {
    const options = {"ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":`${vendingMachinesCreated._id}`,"name":"new value","description":"new value","commissionDate":"2026-03-17T15:06:12.256Z"};

    beforeEach(async () => {
      externalMachineCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new externalMachine", () => {
      assert.strictEqual(externalMachineCreated.ownership.toString(), options.ownership.toString());
assert.strictEqual(externalMachineCreated.vendingMachineCode, options.vendingMachineCode);
assert.strictEqual(externalMachineCreated.modelNo, options.modelNo);
assert.strictEqual(externalMachineCreated.serialNumber, options.serialNumber);
assert.strictEqual(externalMachineCreated.vendingMachineType.toString(), options.vendingMachineType.toString());
assert.strictEqual(externalMachineCreated.commissionDate.toISOString(), options.commissionDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a externalMachine by ID", async () => {
      const retrieved = await thisService.Model.findById(externalMachineCreated._id);
      assert.strictEqual(retrieved._id.toString(), externalMachineCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"ownership":`${branchesCreated._id}`,"vendingMachineCode":"updated value","modelNo":"updated value","serialNumber":"updated value","vendingMachineType":`${vendingMachinesCreated._id}`,"commissionDate":"2026-03-17T15:06:12.256Z"};

    it("should update an existing externalMachine ", async () => {
      const externalMachineUpdated = await thisService.Model.findByIdAndUpdate(
        externalMachineCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(externalMachineUpdated.ownership.toString(), options.ownership.toString());
assert.strictEqual(externalMachineUpdated.vendingMachineCode, options.vendingMachineCode);
assert.strictEqual(externalMachineUpdated.modelNo, options.modelNo);
assert.strictEqual(externalMachineUpdated.serialNumber, options.serialNumber);
assert.strictEqual(externalMachineUpdated.vendingMachineType.toString(), options.vendingMachineType.toString());
assert.strictEqual(externalMachineUpdated.commissionDate.toISOString(), options.commissionDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a externalMachine", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);;

      const externalMachineDeleted = await thisService.Model.findByIdAndDelete(externalMachineCreated._id);
      assert.strictEqual(externalMachineDeleted._id.toString(), externalMachineCreated._id.toString());
    });
  });
});