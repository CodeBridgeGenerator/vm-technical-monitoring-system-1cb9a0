const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("incomingMachineChecklists service", async () => {
  let thisService;
  let incomingMachineChecklistCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("incomingMachineChecklists");

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
    assert.ok(thisService, "Registered the service (incomingMachineChecklists)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value"};

    beforeEach(async () => {
      incomingMachineChecklistCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new incomingMachineChecklist", () => {
      assert.strictEqual(incomingMachineChecklistCreated.name, options.name);
assert.strictEqual(incomingMachineChecklistCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a incomingMachineChecklist by ID", async () => {
      const retrieved = await thisService.Model.findById(incomingMachineChecklistCreated._id);
      assert.strictEqual(retrieved._id.toString(), incomingMachineChecklistCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value"};

    it("should update an existing incomingMachineChecklist ", async () => {
      const incomingMachineChecklistUpdated = await thisService.Model.findByIdAndUpdate(
        incomingMachineChecklistCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(incomingMachineChecklistUpdated.name, options.name);
assert.strictEqual(incomingMachineChecklistUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a incomingMachineChecklist", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const incomingMachineChecklistDeleted = await thisService.Model.findByIdAndDelete(incomingMachineChecklistCreated._id);
      assert.strictEqual(incomingMachineChecklistDeleted._id.toString(), incomingMachineChecklistCreated._id.toString());
    });
  });
});