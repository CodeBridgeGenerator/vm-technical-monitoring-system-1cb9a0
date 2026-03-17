const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("vendingMachines service", async () => {
  let thisService;
  let vendingMachineCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("vendingMachines");

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
    assert.ok(thisService, "Registered the service (vendingMachines)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value"};

    beforeEach(async () => {
      vendingMachineCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new vendingMachine", () => {
      assert.strictEqual(vendingMachineCreated.name, options.name);
assert.strictEqual(vendingMachineCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a vendingMachine by ID", async () => {
      const retrieved = await thisService.Model.findById(vendingMachineCreated._id);
      assert.strictEqual(retrieved._id.toString(), vendingMachineCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value"};

    it("should update an existing vendingMachine ", async () => {
      const vendingMachineUpdated = await thisService.Model.findByIdAndUpdate(
        vendingMachineCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(vendingMachineUpdated.name, options.name);
assert.strictEqual(vendingMachineUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a vendingMachine", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const vendingMachineDeleted = await thisService.Model.findByIdAndDelete(vendingMachineCreated._id);
      assert.strictEqual(vendingMachineDeleted._id.toString(), vendingMachineCreated._id.toString());
    });
  });
});