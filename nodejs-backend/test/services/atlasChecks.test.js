const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("atlasChecks service", async () => {
  let thisService;
  let atlasCheckCreated;
  let usersServiceResults;
  let users;

  const atlasChecklistsCreated = await app.service("atlasChecklists").Model.create({"atlasCheckListId":"parentObjectId","name":"new value","description":"new value"});

  beforeEach(async () => {
    thisService = await app.service("atlasChecks");

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
    assert.ok(thisService, "Registered the service (atlasChecks)");
  });

  describe("#create", () => {
    const options = {"atlasCheckListId":`${atlasChecklistsCreated._id}`,"name":"new value","description":"new value"};

    beforeEach(async () => {
      atlasCheckCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new atlasCheck", () => {
      assert.strictEqual(atlasCheckCreated.atlasCheckListId.toString(), options.atlasCheckListId.toString());
assert.strictEqual(atlasCheckCreated.name, options.name);
assert.strictEqual(atlasCheckCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a atlasCheck by ID", async () => {
      const retrieved = await thisService.Model.findById(atlasCheckCreated._id);
      assert.strictEqual(retrieved._id.toString(), atlasCheckCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"atlasCheckListId":`${atlasChecklistsCreated._id}`,"name":"updated value","description":"updated value"};

    it("should update an existing atlasCheck ", async () => {
      const atlasCheckUpdated = await thisService.Model.findByIdAndUpdate(
        atlasCheckCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(atlasCheckUpdated.atlasCheckListId.toString(), options.atlasCheckListId.toString());
assert.strictEqual(atlasCheckUpdated.name, options.name);
assert.strictEqual(atlasCheckUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a atlasCheck", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("atlasChecklists").Model.findByIdAndDelete(atlasChecklistsCreated._id);;

      const atlasCheckDeleted = await thisService.Model.findByIdAndDelete(atlasCheckCreated._id);
      assert.strictEqual(atlasCheckDeleted._id.toString(), atlasCheckCreated._id.toString());
    });
  });
});