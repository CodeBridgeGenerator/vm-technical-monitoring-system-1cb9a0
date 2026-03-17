const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("supervisorChecks service", async () => {
  let thisService;
  let supervisorCheckCreated;
  let usersServiceResults;
  let users;

  const externalChecklistsCreated = await app.service("externalChecklists").Model.create({"supervisorCheckListId":"parentObjectId","name":"new value","description":"new value"});

  beforeEach(async () => {
    thisService = await app.service("supervisorChecks");

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
    assert.ok(thisService, "Registered the service (supervisorChecks)");
  });

  describe("#create", () => {
    const options = {"supervisorCheckListId":`${externalChecklistsCreated._id}`,"name":"new value","description":"new value"};

    beforeEach(async () => {
      supervisorCheckCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new supervisorCheck", () => {
      assert.strictEqual(supervisorCheckCreated.supervisorCheckListId.toString(), options.supervisorCheckListId.toString());
assert.strictEqual(supervisorCheckCreated.name, options.name);
assert.strictEqual(supervisorCheckCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a supervisorCheck by ID", async () => {
      const retrieved = await thisService.Model.findById(supervisorCheckCreated._id);
      assert.strictEqual(retrieved._id.toString(), supervisorCheckCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"supervisorCheckListId":`${externalChecklistsCreated._id}`,"name":"updated value","description":"updated value"};

    it("should update an existing supervisorCheck ", async () => {
      const supervisorCheckUpdated = await thisService.Model.findByIdAndUpdate(
        supervisorCheckCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(supervisorCheckUpdated.supervisorCheckListId.toString(), options.supervisorCheckListId.toString());
assert.strictEqual(supervisorCheckUpdated.name, options.name);
assert.strictEqual(supervisorCheckUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a supervisorCheck", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("externalChecklists").Model.findByIdAndDelete(externalChecklistsCreated._id);;

      const supervisorCheckDeleted = await thisService.Model.findByIdAndDelete(supervisorCheckCreated._id);
      assert.strictEqual(supervisorCheckDeleted._id.toString(), supervisorCheckCreated._id.toString());
    });
  });
});