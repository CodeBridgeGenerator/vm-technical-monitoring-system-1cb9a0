const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("vmLists service", async () => {
  let thisService;
  let vmListCreated;
  let usersServiceResults;
  let users;

  const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"vmCode":"parentObjectId","ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":"parentObjectId","name":"new value","description":"new value"});
const atlasMachinesCreated = await app.service("atlasMachines").Model.create({"vmCode":"parentObjectId","ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":`${vendingMachinesCreated._id}`,"name":"new value","description":"new value","commissionDate":"2026-03-17T15:06:12.484Z"});

  beforeEach(async () => {
    thisService = await app.service("vmLists");

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
    assert.ok(thisService, "Registered the service (vmLists)");
  });

  describe("#create", () => {
    const options = {"vmCode":`${atlasMachinesCreated._id}`,"ownership":"parentObjectId","vendingMachineCode":"new value","modelNo":"new value","serialNumber":"new value","vendingMachineType":`${vendingMachinesCreated._id}`,"name":"new value","description":"new value","commissionDate":"2026-03-17T15:06:12.484Z","vmLocation":"new value","locationDescription":"new value"};

    beforeEach(async () => {
      vmListCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new vmList", () => {
      assert.strictEqual(vmListCreated.vmCode.toString(), options.vmCode.toString());
assert.strictEqual(vmListCreated.vmLocation, options.vmLocation);
assert.strictEqual(vmListCreated.locationDescription, options.locationDescription);
    });
  });

  describe("#get", () => {
    it("should retrieve a vmList by ID", async () => {
      const retrieved = await thisService.Model.findById(vmListCreated._id);
      assert.strictEqual(retrieved._id.toString(), vmListCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"vmCode":`${atlasMachinesCreated._id}`,"vmLocation":"updated value","locationDescription":"updated value"};

    it("should update an existing vmList ", async () => {
      const vmListUpdated = await thisService.Model.findByIdAndUpdate(
        vmListCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(vmListUpdated.vmCode.toString(), options.vmCode.toString());
assert.strictEqual(vmListUpdated.vmLocation, options.vmLocation);
assert.strictEqual(vmListUpdated.locationDescription, options.locationDescription);
    });
  });

  describe("#delete", async () => {
    it("should delete a vmList", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);
await app.service("atlasMachines").Model.findByIdAndDelete(atlasMachinesCreated._id);;

      const vmListDeleted = await thisService.Model.findByIdAndDelete(vmListCreated._id);
      assert.strictEqual(vmListDeleted._id.toString(), vmListCreated._id.toString());
    });
  });
});