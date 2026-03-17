const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("irmsParts service", async () => {
  let thisService;
  let irmsPartCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("irmsParts");

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
    assert.ok(thisService, "Registered the service (irmsParts)");
  });

  describe("#create", () => {
    const options = {"serialNo":"new value","itemNo":"new value","description":"new value"};

    beforeEach(async () => {
      irmsPartCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new irmsPart", () => {
      assert.strictEqual(irmsPartCreated.serialNo, options.serialNo);
assert.strictEqual(irmsPartCreated.itemNo, options.itemNo);
assert.strictEqual(irmsPartCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a irmsPart by ID", async () => {
      const retrieved = await thisService.Model.findById(irmsPartCreated._id);
      assert.strictEqual(retrieved._id.toString(), irmsPartCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"serialNo":"updated value","itemNo":"updated value","description":"updated value"};

    it("should update an existing irmsPart ", async () => {
      const irmsPartUpdated = await thisService.Model.findByIdAndUpdate(
        irmsPartCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(irmsPartUpdated.serialNo, options.serialNo);
assert.strictEqual(irmsPartUpdated.itemNo, options.itemNo);
assert.strictEqual(irmsPartUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a irmsPart", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const irmsPartDeleted = await thisService.Model.findByIdAndDelete(irmsPartCreated._id);
      assert.strictEqual(irmsPartDeleted._id.toString(), irmsPartCreated._id.toString());
    });
  });
});