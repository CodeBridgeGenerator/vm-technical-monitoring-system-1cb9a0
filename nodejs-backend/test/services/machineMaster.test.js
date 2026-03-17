const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("machineMaster service", async () => {
  let thisService;
  let machineMasterCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"ownership":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":"parentObjectId","description":"new value"});

  beforeEach(async () => {
    thisService = await app.service("machineMaster");

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
    assert.ok(thisService, "Registered the service (machineMaster)");
  });

  describe("#create", () => {
    const options = {"ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:11.323Z"};

    beforeEach(async () => {
      machineMasterCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new machineMaster", () => {
      assert.strictEqual(machineMasterCreated.ownership.toString(), options.ownership.toString());
assert.strictEqual(machineMasterCreated.vendingMachineCode, options.vendingMachineCode);
assert.strictEqual(machineMasterCreated.modelNo, options.modelNo);
assert.strictEqual(machineMasterCreated.serialNumber, options.serialNumber);
assert.strictEqual(machineMasterCreated.vendingMachineType.toString(), options.vendingMachineType.toString());
assert.strictEqual(machineMasterCreated.comissionDate.toISOString(), options.comissionDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a machineMaster by ID", async () => {
      const retrieved = await thisService.Model.findById(machineMasterCreated._id);
      assert.strictEqual(retrieved._id.toString(), machineMasterCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"ownership":`${usersCreated._id}`,"vendingMachineCode":"updated value","modelNo":"updated value","serialNumber":100,"vendingMachineType":`${vendingMachinesCreated._id}`,"comissionDate":"2026-03-17T15:06:11.323Z"};

    it("should update an existing machineMaster ", async () => {
      const machineMasterUpdated = await thisService.Model.findByIdAndUpdate(
        machineMasterCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(machineMasterUpdated.ownership.toString(), options.ownership.toString());
assert.strictEqual(machineMasterUpdated.vendingMachineCode, options.vendingMachineCode);
assert.strictEqual(machineMasterUpdated.modelNo, options.modelNo);
assert.strictEqual(machineMasterUpdated.serialNumber, options.serialNumber);
assert.strictEqual(machineMasterUpdated.vendingMachineType.toString(), options.vendingMachineType.toString());
assert.strictEqual(machineMasterUpdated.comissionDate.toISOString(), options.comissionDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a machineMaster", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);;

      const machineMasterDeleted = await thisService.Model.findByIdAndDelete(machineMasterCreated._id);
      assert.strictEqual(machineMasterDeleted._id.toString(), machineMasterCreated._id.toString());
    });
  });
});