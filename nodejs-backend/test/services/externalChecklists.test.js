const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("externalChecklists service", async () => {
  let thisService;
  let externalChecklistCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("externalChecklists");

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
    assert.ok(thisService, "Registered the service (externalChecklists)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value"};

    beforeEach(async () => {
      externalChecklistCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new externalChecklist", () => {
      assert.strictEqual(externalChecklistCreated.name, options.name);
assert.strictEqual(externalChecklistCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a externalChecklist by ID", async () => {
      const retrieved = await thisService.Model.findById(externalChecklistCreated._id);
      assert.strictEqual(retrieved._id.toString(), externalChecklistCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value"};

    it("should update an existing externalChecklist ", async () => {
      const externalChecklistUpdated = await thisService.Model.findByIdAndUpdate(
        externalChecklistCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(externalChecklistUpdated.name, options.name);
assert.strictEqual(externalChecklistUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a externalChecklist", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const externalChecklistDeleted = await thisService.Model.findByIdAndDelete(externalChecklistCreated._id);
      assert.strictEqual(externalChecklistDeleted._id.toString(), externalChecklistCreated._id.toString());
    });
  });
});