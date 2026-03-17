const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("irmsQuotations service", async () => {
  let thisService;
  let irmsQuotationCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"salesOrder":"parentObjectId","company":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const customerSalesOrdersCreated = await app.service("customerSalesOrders").Model.create({"salesOrder":"parentObjectId","company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value"});

  beforeEach(async () => {
    thisService = await app.service("irmsQuotations");

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
    assert.ok(thisService, "Registered the service (irmsQuotations)");
  });

  describe("#create", () => {
    const options = {"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.877Z","quotationIndex":"new value"};

    beforeEach(async () => {
      irmsQuotationCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new irmsQuotation", () => {
      assert.strictEqual(irmsQuotationCreated.salesOrder.toString(), options.salesOrder.toString());
assert.strictEqual(irmsQuotationCreated.validDate.toISOString(), options.validDate);
assert.strictEqual(irmsQuotationCreated.quotationIndex, options.quotationIndex);
    });
  });

  describe("#get", () => {
    it("should retrieve a irmsQuotation by ID", async () => {
      const retrieved = await thisService.Model.findById(irmsQuotationCreated._id);
      assert.strictEqual(retrieved._id.toString(), irmsQuotationCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"salesOrder":`${customerSalesOrdersCreated._id}`,"validDate":"2026-03-17T15:06:11.877Z","quotationIndex":"updated value"};

    it("should update an existing irmsQuotation ", async () => {
      const irmsQuotationUpdated = await thisService.Model.findByIdAndUpdate(
        irmsQuotationCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(irmsQuotationUpdated.salesOrder.toString(), options.salesOrder.toString());
assert.strictEqual(irmsQuotationUpdated.validDate.toISOString(), options.validDate);
assert.strictEqual(irmsQuotationUpdated.quotationIndex, options.quotationIndex);
    });
  });

  describe("#delete", async () => {
    it("should delete a irmsQuotation", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("customerSalesOrders").Model.findByIdAndDelete(customerSalesOrdersCreated._id);;

      const irmsQuotationDeleted = await thisService.Model.findByIdAndDelete(irmsQuotationCreated._id);
      assert.strictEqual(irmsQuotationDeleted._id.toString(), irmsQuotationCreated._id.toString());
    });
  });
});