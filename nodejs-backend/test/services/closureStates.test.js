const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("closureStates service", async () => {
  let thisService;
  let closureStateCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("closureStates");

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
    assert.ok(thisService, "Registered the service (closureStates)");
  });

  describe("#create", () => {
    const options = {"status":"new value","description":"new value"};

    beforeEach(async () => {
      closureStateCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new closureState", () => {
      assert.strictEqual(closureStateCreated.status, options.status);
assert.strictEqual(closureStateCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a closureState by ID", async () => {
      const retrieved = await thisService.Model.findById(closureStateCreated._id);
      assert.strictEqual(retrieved._id.toString(), closureStateCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"status":"updated value","description":"updated value"};

    it("should update an existing closureState ", async () => {
      const closureStateUpdated = await thisService.Model.findByIdAndUpdate(
        closureStateCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(closureStateUpdated.status, options.status);
assert.strictEqual(closureStateUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a closureState", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const closureStateDeleted = await thisService.Model.findByIdAndDelete(closureStateCreated._id);
      assert.strictEqual(closureStateDeleted._id.toString(), closureStateCreated._id.toString());
    });
  });
});