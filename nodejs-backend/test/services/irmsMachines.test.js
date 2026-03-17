const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("irmsMachines service", async () => {
  let thisService;
  let irmsMachineCreated;
  let usersServiceResults;
  let users;

  const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":"parentObjectId","name":"new value","description":"new value"});

  beforeEach(async () => {
    thisService = await app.service("irmsMachines");

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
    assert.ok(thisService, "Registered the service (irmsMachines)");
  });

  describe("#create", () => {
    const options = {"ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":`${vendingMachinesCreated._id}`,"name":"new value","description":"new value","commissionDate":"2026-03-17T15:06:12.367Z"};

    beforeEach(async () => {
      irmsMachineCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new irmsMachine", () => {
      assert.strictEqual(irmsMachineCreated.ownership.toString(), options.ownership.toString());
assert.strictEqual(irmsMachineCreated.vendingMachineCode, options.vendingMachineCode);
assert.strictEqual(irmsMachineCreated.modelNo, options.modelNo);
assert.strictEqual(irmsMachineCreated.serialNumber, options.serialNumber);
assert.strictEqual(irmsMachineCreated.vendingMachineType.toString(), options.vendingMachineType.toString());
assert.strictEqual(irmsMachineCreated.commissionDate.toISOString(), options.commissionDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a irmsMachine by ID", async () => {
      const retrieved = await thisService.Model.findById(irmsMachineCreated._id);
      assert.strictEqual(retrieved._id.toString(), irmsMachineCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"ownership":`${branchesCreated._id}`,"vendingMachineCode":"updated value","modelNo":"updated value","serialNumber":"updated value","vendingMachineType":`${vendingMachinesCreated._id}`,"commissionDate":"2026-03-17T15:06:12.367Z"};

    it("should update an existing irmsMachine ", async () => {
      const irmsMachineUpdated = await thisService.Model.findByIdAndUpdate(
        irmsMachineCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(irmsMachineUpdated.ownership.toString(), options.ownership.toString());
assert.strictEqual(irmsMachineUpdated.vendingMachineCode, options.vendingMachineCode);
assert.strictEqual(irmsMachineUpdated.modelNo, options.modelNo);
assert.strictEqual(irmsMachineUpdated.serialNumber, options.serialNumber);
assert.strictEqual(irmsMachineUpdated.vendingMachineType.toString(), options.vendingMachineType.toString());
assert.strictEqual(irmsMachineUpdated.commissionDate.toISOString(), options.commissionDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a irmsMachine", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);;

      const irmsMachineDeleted = await thisService.Model.findByIdAndDelete(irmsMachineCreated._id);
      assert.strictEqual(irmsMachineDeleted._id.toString(), irmsMachineCreated._id.toString());
    });
  });
});