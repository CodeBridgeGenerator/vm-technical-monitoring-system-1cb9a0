const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("externalChecks service", async () => {
  let thisService;
  let externalCheckCreated;
  let usersServiceResults;
  let users;

  const externalChecklistsCreated = await app.service("externalChecklists").Model.create({"checkListId":"parentObjectId","name":"new value","description":"new value"});

  beforeEach(async () => {
    thisService = await app.service("externalChecks");

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
    assert.ok(thisService, "Registered the service (externalChecks)");
  });

  describe("#create", () => {
    const options = {"checkListId":`${externalChecklistsCreated._id}`,"name":"new value","description":"new value"};

    beforeEach(async () => {
      externalCheckCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new externalCheck", () => {
      assert.strictEqual(externalCheckCreated.checkListId.toString(), options.checkListId.toString());
assert.strictEqual(externalCheckCreated.name, options.name);
assert.strictEqual(externalCheckCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a externalCheck by ID", async () => {
      const retrieved = await thisService.Model.findById(externalCheckCreated._id);
      assert.strictEqual(retrieved._id.toString(), externalCheckCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"checkListId":`${externalChecklistsCreated._id}`,"name":"updated value","description":"updated value"};

    it("should update an existing externalCheck ", async () => {
      const externalCheckUpdated = await thisService.Model.findByIdAndUpdate(
        externalCheckCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(externalCheckUpdated.checkListId.toString(), options.checkListId.toString());
assert.strictEqual(externalCheckUpdated.name, options.name);
assert.strictEqual(externalCheckUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a externalCheck", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("externalChecklists").Model.findByIdAndDelete(externalChecklistsCreated._id);;

      const externalCheckDeleted = await thisService.Model.findByIdAndDelete(externalCheckCreated._id);
      assert.strictEqual(externalCheckDeleted._id.toString(), externalCheckCreated._id.toString());
    });
  });
});