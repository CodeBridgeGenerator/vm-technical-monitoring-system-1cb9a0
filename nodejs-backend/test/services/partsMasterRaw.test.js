const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("partsMasterRaw service", async () => {
  let thisService;
  let partsMasterRawCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("partsMasterRaw");

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
    assert.ok(thisService, "Registered the service (partsMasterRaw)");
  });

  describe("#create", () => {
    const options = {"serialNo":"new value","itemNo":"new value","description":"new value","quantity":"new value","costAmount":"new value"};

    beforeEach(async () => {
      partsMasterRawCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new partsMasterRaw", () => {
      assert.strictEqual(partsMasterRawCreated.serialNo, options.serialNo);
assert.strictEqual(partsMasterRawCreated.itemNo, options.itemNo);
assert.strictEqual(partsMasterRawCreated.description, options.description);
assert.strictEqual(partsMasterRawCreated.quantity, options.quantity);
assert.strictEqual(partsMasterRawCreated.costAmount, options.costAmount);
    });
  });

  describe("#get", () => {
    it("should retrieve a partsMasterRaw by ID", async () => {
      const retrieved = await thisService.Model.findById(partsMasterRawCreated._id);
      assert.strictEqual(retrieved._id.toString(), partsMasterRawCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"serialNo":"updated value","itemNo":"updated value","description":"updated value","quantity":"updated value","costAmount":"updated value"};

    it("should update an existing partsMasterRaw ", async () => {
      const partsMasterRawUpdated = await thisService.Model.findByIdAndUpdate(
        partsMasterRawCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(partsMasterRawUpdated.serialNo, options.serialNo);
assert.strictEqual(partsMasterRawUpdated.itemNo, options.itemNo);
assert.strictEqual(partsMasterRawUpdated.description, options.description);
assert.strictEqual(partsMasterRawUpdated.quantity, options.quantity);
assert.strictEqual(partsMasterRawUpdated.costAmount, options.costAmount);
    });
  });

  describe("#delete", async () => {
    it("should delete a partsMasterRaw", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const partsMasterRawDeleted = await thisService.Model.findByIdAndDelete(partsMasterRawCreated._id);
      assert.strictEqual(partsMasterRawDeleted._id.toString(), partsMasterRawCreated._id.toString());
    });
  });
});