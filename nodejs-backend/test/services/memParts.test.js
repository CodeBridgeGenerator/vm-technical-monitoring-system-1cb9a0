const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("memParts service", async () => {
  let thisService;
  let memPartCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("memParts");

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
    assert.ok(thisService, "Registered the service (memParts)");
  });

  describe("#create", () => {
    const options = {"item":"new value"};

    beforeEach(async () => {
      memPartCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new memPart", () => {
      assert.strictEqual(memPartCreated.item, options.item);
    });
  });

  describe("#get", () => {
    it("should retrieve a memPart by ID", async () => {
      const retrieved = await thisService.Model.findById(memPartCreated._id);
      assert.strictEqual(retrieved._id.toString(), memPartCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"item":"updated value"};

    it("should update an existing memPart ", async () => {
      const memPartUpdated = await thisService.Model.findByIdAndUpdate(
        memPartCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(memPartUpdated.item, options.item);
    });
  });

  describe("#delete", async () => {
    it("should delete a memPart", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const memPartDeleted = await thisService.Model.findByIdAndDelete(memPartCreated._id);
      assert.strictEqual(memPartDeleted._id.toString(), memPartCreated._id.toString());
    });
  });
});