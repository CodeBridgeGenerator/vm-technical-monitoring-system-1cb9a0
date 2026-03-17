const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("documentStorages service", async () => {
  let thisService;
  let documentStorageCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("documentStorages");

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
    assert.ok(thisService, "Registered the service (documentStorages)");
  });

  describe("#create", () => {
    const options = {"name":"new value"};

    beforeEach(async () => {
      documentStorageCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new documentStorage", () => {
      assert.strictEqual(documentStorageCreated.name, options.name);
    });
  });

  describe("#get", () => {
    it("should retrieve a documentStorage by ID", async () => {
      const retrieved = await thisService.Model.findById(documentStorageCreated._id);
      assert.strictEqual(retrieved._id.toString(), documentStorageCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value"};

    it("should update an existing documentStorage ", async () => {
      const documentStorageUpdated = await thisService.Model.findByIdAndUpdate(
        documentStorageCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(documentStorageUpdated.name, options.name);
    });
  });

  describe("#delete", async () => {
    it("should delete a documentStorage", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const documentStorageDeleted = await thisService.Model.findByIdAndDelete(documentStorageCreated._id);
      assert.strictEqual(documentStorageDeleted._id.toString(), documentStorageCreated._id.toString());
    });
  });
});