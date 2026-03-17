const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("atlasChecklists service", async () => {
  let thisService;
  let atlasChecklistCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("atlasChecklists");

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
    assert.ok(thisService, "Registered the service (atlasChecklists)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value"};

    beforeEach(async () => {
      atlasChecklistCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new atlasChecklist", () => {
      assert.strictEqual(atlasChecklistCreated.name, options.name);
assert.strictEqual(atlasChecklistCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a atlasChecklist by ID", async () => {
      const retrieved = await thisService.Model.findById(atlasChecklistCreated._id);
      assert.strictEqual(retrieved._id.toString(), atlasChecklistCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value"};

    it("should update an existing atlasChecklist ", async () => {
      const atlasChecklistUpdated = await thisService.Model.findByIdAndUpdate(
        atlasChecklistCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(atlasChecklistUpdated.name, options.name);
assert.strictEqual(atlasChecklistUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a atlasChecklist", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const atlasChecklistDeleted = await thisService.Model.findByIdAndDelete(atlasChecklistCreated._id);
      assert.strictEqual(atlasChecklistDeleted._id.toString(), atlasChecklistCreated._id.toString());
    });
  });
});