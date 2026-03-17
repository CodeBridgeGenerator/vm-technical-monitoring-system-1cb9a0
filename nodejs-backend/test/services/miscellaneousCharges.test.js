const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("miscellaneousCharges service", async () => {
  let thisService;
  let miscellaneousChargeCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"name":"new value","description":"new value","amount":23,"quotationNo":"parentObjectId","salesOrder":"parentObjectId","company":"parentObjectId","email":"new value","status":true,"password":"new value","remember_token":true});
const customerSalesOrdersCreated = await app.service("customerSalesOrders").Model.create({"name":"new value","description":"new value","amount":23,"quotationNo":"parentObjectId","salesOrder":"parentObjectId","company":`${usersCreated._id}`,"email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value"});
const irmsQuotationsCreated = await app.service("irmsQuotations").Model.create({"name":"new value","description":"new value","amount":23,"quotationNo":"parentObjectId","salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:12.030Z","quotationIndex":"new value"});

  beforeEach(async () => {
    thisService = await app.service("miscellaneousCharges");

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
    assert.ok(thisService, "Registered the service (miscellaneousCharges)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value","amount":23,"quotationNo":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:12.030Z","quotationIndex":"new value"};

    beforeEach(async () => {
      miscellaneousChargeCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new miscellaneousCharge", () => {
      assert.strictEqual(miscellaneousChargeCreated.name, options.name);
assert.strictEqual(miscellaneousChargeCreated.description, options.description);
assert.strictEqual(miscellaneousChargeCreated.amount, options.amount);
assert.strictEqual(miscellaneousChargeCreated.quotationNo.toString(), options.quotationNo.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a miscellaneousCharge by ID", async () => {
      const retrieved = await thisService.Model.findById(miscellaneousChargeCreated._id);
      assert.strictEqual(retrieved._id.toString(), miscellaneousChargeCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value","amount":100,"quotationNo":`${irmsQuotationsCreated._id}`};

    it("should update an existing miscellaneousCharge ", async () => {
      const miscellaneousChargeUpdated = await thisService.Model.findByIdAndUpdate(
        miscellaneousChargeCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(miscellaneousChargeUpdated.name, options.name);
assert.strictEqual(miscellaneousChargeUpdated.description, options.description);
assert.strictEqual(miscellaneousChargeUpdated.amount, options.amount);
assert.strictEqual(miscellaneousChargeUpdated.quotationNo.toString(), options.quotationNo.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a miscellaneousCharge", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("customerSalesOrders").Model.findByIdAndDelete(customerSalesOrdersCreated._id);
await app.service("irmsQuotations").Model.findByIdAndDelete(irmsQuotationsCreated._id);;

      const miscellaneousChargeDeleted = await thisService.Model.findByIdAndDelete(miscellaneousChargeCreated._id);
      assert.strictEqual(miscellaneousChargeDeleted._id.toString(), miscellaneousChargeCreated._id.toString());
    });
  });
});