const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("locationMaster service", async () => {
  let thisService;
  let locationMasterCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("locationMaster");

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
    assert.ok(thisService, "Registered the service (locationMaster)");
  });

  describe("#create", () => {
    const options = {"name":"new value","code":"new value","type":"new value","area":"new value","description":"new value","supervisor":"new value"};

    beforeEach(async () => {
      locationMasterCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new locationMaster", () => {
      assert.strictEqual(locationMasterCreated.name, options.name);
assert.strictEqual(locationMasterCreated.code, options.code);
assert.strictEqual(locationMasterCreated.type, options.type);
assert.strictEqual(locationMasterCreated.area, options.area);
assert.strictEqual(locationMasterCreated.description, options.description);
assert.strictEqual(locationMasterCreated.supervisor, options.supervisor);
    });
  });

  describe("#get", () => {
    it("should retrieve a locationMaster by ID", async () => {
      const retrieved = await thisService.Model.findById(locationMasterCreated._id);
      assert.strictEqual(retrieved._id.toString(), locationMasterCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","code":"updated value","type":"updated value","area":"updated value","description":"updated value","supervisor":"updated value"};

    it("should update an existing locationMaster ", async () => {
      const locationMasterUpdated = await thisService.Model.findByIdAndUpdate(
        locationMasterCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(locationMasterUpdated.name, options.name);
assert.strictEqual(locationMasterUpdated.code, options.code);
assert.strictEqual(locationMasterUpdated.type, options.type);
assert.strictEqual(locationMasterUpdated.area, options.area);
assert.strictEqual(locationMasterUpdated.description, options.description);
assert.strictEqual(locationMasterUpdated.supervisor, options.supervisor);
    });
  });

  describe("#delete", async () => {
    it("should delete a locationMaster", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const locationMasterDeleted = await thisService.Model.findByIdAndDelete(locationMasterCreated._id);
      assert.strictEqual(locationMasterDeleted._id.toString(), locationMasterCreated._id.toString());
    });
  });
});