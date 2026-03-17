const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("documentationDetails service", async () => {
  let thisService;
  let documentationDetailCreated;
  let usersServiceResults;
  let users;

  const documentStoragesCreated = await app.service("documentStorages").Model.create({"fileName":"new value","documentationFile":"parentObjectId","name":"new value"});

  beforeEach(async () => {
    thisService = await app.service("documentationDetails");

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
    assert.ok(thisService, "Registered the service (documentationDetails)");
  });

  describe("#create", () => {
    const options = {"fileName":"new value","documentationFile":`${documentStoragesCreated._id}`,"name":"new value"};

    beforeEach(async () => {
      documentationDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new documentationDetail", () => {
      assert.strictEqual(documentationDetailCreated.fileName, options.fileName);
assert.strictEqual(documentationDetailCreated.documentationFile.toString(), options.documentationFile.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a documentationDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(documentationDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), documentationDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"fileName":"updated value","documentationFile":`${documentStoragesCreated._id}`};

    it("should update an existing documentationDetail ", async () => {
      const documentationDetailUpdated = await thisService.Model.findByIdAndUpdate(
        documentationDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(documentationDetailUpdated.fileName, options.fileName);
assert.strictEqual(documentationDetailUpdated.documentationFile.toString(), options.documentationFile.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a documentationDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("documentStorages").Model.findByIdAndDelete(documentStoragesCreated._id);;

      const documentationDetailDeleted = await thisService.Model.findByIdAndDelete(documentationDetailCreated._id);
      assert.strictEqual(documentationDetailDeleted._id.toString(), documentationDetailCreated._id.toString());
    });
  });
});