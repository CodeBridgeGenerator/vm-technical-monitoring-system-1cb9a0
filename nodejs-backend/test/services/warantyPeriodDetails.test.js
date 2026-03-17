const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("warantyPeriodDetails service", async () => {
  let thisService;
  let warantyPeriodDetailCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"name":"new value","period":"new value","quotationIndex":"parentObjectId","salesOrder":"parentObjectId","company":"parentObjectId","email":"new value","status":true,"password":"new value","remember_token":true});
const customerSalesOrdersCreated = await app.service("customerSalesOrders").Model.create({"name":"new value","period":"new value","quotationIndex":"parentObjectId","salesOrder":"parentObjectId","company":`${usersCreated._id}`,"email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value"});
const irmsQuotationsCreated = await app.service("irmsQuotations").Model.create({"name":"new value","period":"new value","quotationIndex":"new value","salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:12.046Z"});

  beforeEach(async () => {
    thisService = await app.service("warantyPeriodDetails");

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
    assert.ok(thisService, "Registered the service (warantyPeriodDetails)");
  });

  describe("#create", () => {
    const options = {"name":"new value","period":"new value","quotationIndex":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:12.046Z"};

    beforeEach(async () => {
      warantyPeriodDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new warantyPeriodDetail", () => {
      assert.strictEqual(warantyPeriodDetailCreated.name, options.name);
assert.strictEqual(warantyPeriodDetailCreated.period, options.period);
assert.strictEqual(warantyPeriodDetailCreated.quotationIndex.toString(), options.quotationIndex.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a warantyPeriodDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(warantyPeriodDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), warantyPeriodDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","period":"updated value","quotationIndex":`${irmsQuotationsCreated._id}`};

    it("should update an existing warantyPeriodDetail ", async () => {
      const warantyPeriodDetailUpdated = await thisService.Model.findByIdAndUpdate(
        warantyPeriodDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(warantyPeriodDetailUpdated.name, options.name);
assert.strictEqual(warantyPeriodDetailUpdated.period, options.period);
assert.strictEqual(warantyPeriodDetailUpdated.quotationIndex.toString(), options.quotationIndex.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a warantyPeriodDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("customerSalesOrders").Model.findByIdAndDelete(customerSalesOrdersCreated._id);
await app.service("irmsQuotations").Model.findByIdAndDelete(irmsQuotationsCreated._id);;

      const warantyPeriodDetailDeleted = await thisService.Model.findByIdAndDelete(warantyPeriodDetailCreated._id);
      assert.strictEqual(warantyPeriodDetailDeleted._id.toString(), warantyPeriodDetailCreated._id.toString());
    });
  });
});