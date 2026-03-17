const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("technicianChecklists service", async () => {
  let thisService;
  let technicianChecklistCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("technicianChecklists");

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
    assert.ok(thisService, "Registered the service (technicianChecklists)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value"};

    beforeEach(async () => {
      technicianChecklistCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new technicianChecklist", () => {
      assert.strictEqual(technicianChecklistCreated.name, options.name);
assert.strictEqual(technicianChecklistCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a technicianChecklist by ID", async () => {
      const retrieved = await thisService.Model.findById(technicianChecklistCreated._id);
      assert.strictEqual(retrieved._id.toString(), technicianChecklistCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value"};

    it("should update an existing technicianChecklist ", async () => {
      const technicianChecklistUpdated = await thisService.Model.findByIdAndUpdate(
        technicianChecklistCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(technicianChecklistUpdated.name, options.name);
assert.strictEqual(technicianChecklistUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a technicianChecklist", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const technicianChecklistDeleted = await thisService.Model.findByIdAndDelete(technicianChecklistCreated._id);
      assert.strictEqual(technicianChecklistDeleted._id.toString(), technicianChecklistCreated._id.toString());
    });
  });
});