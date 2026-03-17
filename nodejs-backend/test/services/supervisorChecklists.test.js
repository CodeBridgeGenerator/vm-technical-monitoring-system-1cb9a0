const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("supervisorChecklists service", async () => {
  let thisService;
  let supervisorChecklistCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("supervisorChecklists");

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
    assert.ok(thisService, "Registered the service (supervisorChecklists)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value"};

    beforeEach(async () => {
      supervisorChecklistCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new supervisorChecklist", () => {
      assert.strictEqual(supervisorChecklistCreated.name, options.name);
assert.strictEqual(supervisorChecklistCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a supervisorChecklist by ID", async () => {
      const retrieved = await thisService.Model.findById(supervisorChecklistCreated._id);
      assert.strictEqual(retrieved._id.toString(), supervisorChecklistCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value"};

    it("should update an existing supervisorChecklist ", async () => {
      const supervisorChecklistUpdated = await thisService.Model.findByIdAndUpdate(
        supervisorChecklistCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(supervisorChecklistUpdated.name, options.name);
assert.strictEqual(supervisorChecklistUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a supervisorChecklist", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const supervisorChecklistDeleted = await thisService.Model.findByIdAndDelete(supervisorChecklistCreated._id);
      assert.strictEqual(supervisorChecklistDeleted._id.toString(), supervisorChecklistCreated._id.toString());
    });
  });
});