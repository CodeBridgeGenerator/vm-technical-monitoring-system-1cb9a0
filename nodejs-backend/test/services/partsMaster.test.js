const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("partsMaster service", async () => {
  let thisService;
  let partsMasterCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("partsMaster");

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
    assert.ok(thisService, "Registered the service (partsMaster)");
  });

  describe("#create", () => {
    const options = {"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23};

    beforeEach(async () => {
      partsMasterCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new partsMaster", () => {
      assert.strictEqual(partsMasterCreated.serialNo, options.serialNo);
assert.strictEqual(partsMasterCreated.itemNo, options.itemNo);
assert.strictEqual(partsMasterCreated.description, options.description);
assert.strictEqual(partsMasterCreated.quantity, options.quantity);
assert.strictEqual(partsMasterCreated.costAmount, options.costAmount);
    });
  });

  describe("#get", () => {
    it("should retrieve a partsMaster by ID", async () => {
      const retrieved = await thisService.Model.findById(partsMasterCreated._id);
      assert.strictEqual(retrieved._id.toString(), partsMasterCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"serialNo":"updated value","itemNo":"updated value","description":"updated value","quantity":100,"costAmount":100};

    it("should update an existing partsMaster ", async () => {
      const partsMasterUpdated = await thisService.Model.findByIdAndUpdate(
        partsMasterCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(partsMasterUpdated.serialNo, options.serialNo);
assert.strictEqual(partsMasterUpdated.itemNo, options.itemNo);
assert.strictEqual(partsMasterUpdated.description, options.description);
assert.strictEqual(partsMasterUpdated.quantity, options.quantity);
assert.strictEqual(partsMasterUpdated.costAmount, options.costAmount);
    });
  });

  describe("#delete", async () => {
    it("should delete a partsMaster", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const partsMasterDeleted = await thisService.Model.findByIdAndDelete(partsMasterCreated._id);
      assert.strictEqual(partsMasterDeleted._id.toString(), partsMasterCreated._id.toString());
    });
  });
});