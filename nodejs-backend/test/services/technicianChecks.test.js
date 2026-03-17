const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("technicianChecks service", async () => {
  let thisService;
  let technicianCheckCreated;
  let usersServiceResults;
  let users;

  const technicianChecklistsCreated = await app.service("technicianChecklists").Model.create({"technicianCheckListId":"parentObjectId","name":"new value","description":"new value"});

  beforeEach(async () => {
    thisService = await app.service("technicianChecks");

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
    assert.ok(thisService, "Registered the service (technicianChecks)");
  });

  describe("#create", () => {
    const options = {"technicianCheckListId":`${technicianChecklistsCreated._id}`,"name":"new value","description":"new value"};

    beforeEach(async () => {
      technicianCheckCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new technicianCheck", () => {
      assert.strictEqual(technicianCheckCreated.technicianCheckListId.toString(), options.technicianCheckListId.toString());
assert.strictEqual(technicianCheckCreated.name, options.name);
assert.strictEqual(technicianCheckCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a technicianCheck by ID", async () => {
      const retrieved = await thisService.Model.findById(technicianCheckCreated._id);
      assert.strictEqual(retrieved._id.toString(), technicianCheckCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"technicianCheckListId":`${technicianChecklistsCreated._id}`,"name":"updated value","description":"updated value"};

    it("should update an existing technicianCheck ", async () => {
      const technicianCheckUpdated = await thisService.Model.findByIdAndUpdate(
        technicianCheckCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(technicianCheckUpdated.technicianCheckListId.toString(), options.technicianCheckListId.toString());
assert.strictEqual(technicianCheckUpdated.name, options.name);
assert.strictEqual(technicianCheckUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a technicianCheck", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("technicianChecklists").Model.findByIdAndDelete(technicianChecklistsCreated._id);;

      const technicianCheckDeleted = await thisService.Model.findByIdAndDelete(technicianCheckCreated._id);
      assert.strictEqual(technicianCheckDeleted._id.toString(), technicianCheckCreated._id.toString());
    });
  });
});