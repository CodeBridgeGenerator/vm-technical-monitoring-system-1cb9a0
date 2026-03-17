const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("incomingMachineChecks service", async () => {
  let thisService;
  let incomingMachineCheckCreated;
  let usersServiceResults;
  let users;

  const incomingMachineChecklistsCreated = await app.service("incomingMachineChecklists").Model.create({"checkListId":"parentObjectId","name":"new value","description":"new value"});

  beforeEach(async () => {
    thisService = await app.service("incomingMachineChecks");

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
    assert.ok(thisService, "Registered the service (incomingMachineChecks)");
  });

  describe("#create", () => {
    const options = {"checkListId":`${incomingMachineChecklistsCreated._id}`,"name":"new value","description":"new value"};

    beforeEach(async () => {
      incomingMachineCheckCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new incomingMachineCheck", () => {
      assert.strictEqual(incomingMachineCheckCreated.checkListId.toString(), options.checkListId.toString());
assert.strictEqual(incomingMachineCheckCreated.name, options.name);
assert.strictEqual(incomingMachineCheckCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a incomingMachineCheck by ID", async () => {
      const retrieved = await thisService.Model.findById(incomingMachineCheckCreated._id);
      assert.strictEqual(retrieved._id.toString(), incomingMachineCheckCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"checkListId":`${incomingMachineChecklistsCreated._id}`,"name":"updated value","description":"updated value"};

    it("should update an existing incomingMachineCheck ", async () => {
      const incomingMachineCheckUpdated = await thisService.Model.findByIdAndUpdate(
        incomingMachineCheckCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(incomingMachineCheckUpdated.checkListId.toString(), options.checkListId.toString());
assert.strictEqual(incomingMachineCheckUpdated.name, options.name);
assert.strictEqual(incomingMachineCheckUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a incomingMachineCheck", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("incomingMachineChecklists").Model.findByIdAndDelete(incomingMachineChecklistsCreated._id);;

      const incomingMachineCheckDeleted = await thisService.Model.findByIdAndDelete(incomingMachineCheckCreated._id);
      assert.strictEqual(incomingMachineCheckDeleted._id.toString(), incomingMachineCheckCreated._id.toString());
    });
  });
});