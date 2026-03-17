const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("warehouseMaster service", async () => {
  let thisService;
  let warehouseMasterCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("warehouseMaster");

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
    assert.ok(thisService, "Registered the service (warehouseMaster)");
  });

  describe("#create", () => {
    const options = {"name":"new value","location":"new value"};

    beforeEach(async () => {
      warehouseMasterCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new warehouseMaster", () => {
      assert.strictEqual(warehouseMasterCreated.name, options.name);
assert.strictEqual(warehouseMasterCreated.location, options.location);
    });
  });

  describe("#get", () => {
    it("should retrieve a warehouseMaster by ID", async () => {
      const retrieved = await thisService.Model.findById(warehouseMasterCreated._id);
      assert.strictEqual(retrieved._id.toString(), warehouseMasterCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","location":"updated value"};

    it("should update an existing warehouseMaster ", async () => {
      const warehouseMasterUpdated = await thisService.Model.findByIdAndUpdate(
        warehouseMasterCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(warehouseMasterUpdated.name, options.name);
assert.strictEqual(warehouseMasterUpdated.location, options.location);
    });
  });

  describe("#delete", async () => {
    it("should delete a warehouseMaster", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const warehouseMasterDeleted = await thisService.Model.findByIdAndDelete(warehouseMasterCreated._id);
      assert.strictEqual(warehouseMasterDeleted._id.toString(), warehouseMasterCreated._id.toString());
    });
  });
});