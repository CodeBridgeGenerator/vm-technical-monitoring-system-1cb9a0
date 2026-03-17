const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("operationCentres service", async () => {
  let thisService;
  let operationCentreCreated;
  let usersServiceResults;
  let users;

  const locationMasterCreated = await app.service("locationMaster").Model.create({"name":"new value","code":"new value","type":"new value","area":"new value","description":"new value","supervisor":"new value"});

  beforeEach(async () => {
    thisService = await app.service("operationCentres");

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
    assert.ok(thisService, "Registered the service (operationCentres)");
  });

  describe("#create", () => {
    const options = {"name":"new value","code":`${locationMasterCreated._id}`,"type":"new value","area":"new value","description":"new value","supervisor":"new value"};

    beforeEach(async () => {
      operationCentreCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new operationCentre", () => {
      assert.strictEqual(operationCentreCreated.name, options.name);
assert.strictEqual(operationCentreCreated.code.toString(), options.code.toString());
assert.strictEqual(operationCentreCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a operationCentre by ID", async () => {
      const retrieved = await thisService.Model.findById(operationCentreCreated._id);
      assert.strictEqual(retrieved._id.toString(), operationCentreCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","code":`${locationMasterCreated._id}`,"description":"updated value"};

    it("should update an existing operationCentre ", async () => {
      const operationCentreUpdated = await thisService.Model.findByIdAndUpdate(
        operationCentreCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(operationCentreUpdated.name, options.name);
assert.strictEqual(operationCentreUpdated.code.toString(), options.code.toString());
assert.strictEqual(operationCentreUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a operationCentre", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("locationMaster").Model.findByIdAndDelete(locationMasterCreated._id);;

      const operationCentreDeleted = await thisService.Model.findByIdAndDelete(operationCentreCreated._id);
      assert.strictEqual(operationCentreDeleted._id.toString(), operationCentreCreated._id.toString());
    });
  });
});