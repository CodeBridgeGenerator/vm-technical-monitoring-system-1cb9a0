const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("machineMasterRaw service", async () => {
  let thisService;
  let machineMasterRawCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("machineMasterRaw");

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
    assert.ok(thisService, "Registered the service (machineMasterRaw)");
  });

  describe("#create", () => {
    const options = {"ownership":"new value","vendingMachineCode":"new value","modelNo":"new value","serialNo":"new value","commissionDate":"new value"};

    beforeEach(async () => {
      machineMasterRawCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new machineMasterRaw", () => {
      assert.strictEqual(machineMasterRawCreated.ownership, options.ownership);
assert.strictEqual(machineMasterRawCreated.vendingMachineCode, options.vendingMachineCode);
assert.strictEqual(machineMasterRawCreated.modelNo, options.modelNo);
assert.strictEqual(machineMasterRawCreated.serialNo, options.serialNo);
assert.strictEqual(machineMasterRawCreated.commissionDate, options.commissionDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a machineMasterRaw by ID", async () => {
      const retrieved = await thisService.Model.findById(machineMasterRawCreated._id);
      assert.strictEqual(retrieved._id.toString(), machineMasterRawCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"ownership":"updated value","vendingMachineCode":"updated value","modelNo":"updated value","serialNo":"updated value","commissionDate":"updated value"};

    it("should update an existing machineMasterRaw ", async () => {
      const machineMasterRawUpdated = await thisService.Model.findByIdAndUpdate(
        machineMasterRawCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(machineMasterRawUpdated.ownership, options.ownership);
assert.strictEqual(machineMasterRawUpdated.vendingMachineCode, options.vendingMachineCode);
assert.strictEqual(machineMasterRawUpdated.modelNo, options.modelNo);
assert.strictEqual(machineMasterRawUpdated.serialNo, options.serialNo);
assert.strictEqual(machineMasterRawUpdated.commissionDate, options.commissionDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a machineMasterRaw", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const machineMasterRawDeleted = await thisService.Model.findByIdAndDelete(machineMasterRawCreated._id);
      assert.strictEqual(machineMasterRawDeleted._id.toString(), machineMasterRawCreated._id.toString());
    });
  });
});