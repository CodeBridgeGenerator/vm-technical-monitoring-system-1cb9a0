const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("customerDetails service", async () => {
  let thisService;
  let customerDetailCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("customerDetails");

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
    assert.ok(thisService, "Registered the service (customerDetails)");
  });

  describe("#create", () => {
    const options = {"customerNo":"new value","name":"new value","phoneNo":"new value","agentName":"new value","address":"new value"};

    beforeEach(async () => {
      customerDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new customerDetail", () => {
      assert.strictEqual(customerDetailCreated.customerNo, options.customerNo);
assert.strictEqual(customerDetailCreated.name, options.name);
assert.strictEqual(customerDetailCreated.phoneNo, options.phoneNo);
assert.strictEqual(customerDetailCreated.agentName, options.agentName);
assert.strictEqual(customerDetailCreated.address, options.address);
    });
  });

  describe("#get", () => {
    it("should retrieve a customerDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(customerDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), customerDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"customerNo":"updated value","name":"updated value","phoneNo":"updated value","agentName":"updated value","address":"updated value"};

    it("should update an existing customerDetail ", async () => {
      const customerDetailUpdated = await thisService.Model.findByIdAndUpdate(
        customerDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(customerDetailUpdated.customerNo, options.customerNo);
assert.strictEqual(customerDetailUpdated.name, options.name);
assert.strictEqual(customerDetailUpdated.phoneNo, options.phoneNo);
assert.strictEqual(customerDetailUpdated.agentName, options.agentName);
assert.strictEqual(customerDetailUpdated.address, options.address);
    });
  });

  describe("#delete", async () => {
    it("should delete a customerDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const customerDetailDeleted = await thisService.Model.findByIdAndDelete(customerDetailCreated._id);
      assert.strictEqual(customerDetailDeleted._id.toString(), customerDetailCreated._id.toString());
    });
  });
});