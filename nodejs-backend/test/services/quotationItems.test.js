const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("quotationItems service", async () => {
  let thisService;
  let quotationItemCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"quotation":"parentObjectId","salesOrder":"parentObjectId","company":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const customerSalesOrdersCreated = await app.service("customerSalesOrders").Model.create({"quotation":"parentObjectId","salesOrder":"parentObjectId","company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value"});
const irmsQuotationsCreated = await app.service("irmsQuotations").Model.create({"quotation":"parentObjectId","salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.892Z","quotationIndex":"new value"});
const partsMasterCreated = await app.service("partsMaster").Model.create({"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.892Z","quotationIndex":"new value","part":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23});

  beforeEach(async () => {
    thisService = await app.service("quotationItems");

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
    assert.ok(thisService, "Registered the service (quotationItems)");
  });

  describe("#create", () => {
    const options = {"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.892Z","quotationIndex":"new value","part":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"UnitPrice":23};

    beforeEach(async () => {
      quotationItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new quotationItem", () => {
      assert.strictEqual(quotationItemCreated.quotation.toString(), options.quotation.toString());
assert.strictEqual(quotationItemCreated.part.toString(), options.part.toString());
assert.strictEqual(quotationItemCreated.quantity, options.quantity);
assert.strictEqual(quotationItemCreated.UnitPrice, options.UnitPrice);
    });
  });

  describe("#get", () => {
    it("should retrieve a quotationItem by ID", async () => {
      const retrieved = await thisService.Model.findById(quotationItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), quotationItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"quotation":`${irmsQuotationsCreated._id}`,"part":`${partsMasterCreated._id}`,"quantity":100,"UnitPrice":100};

    it("should update an existing quotationItem ", async () => {
      const quotationItemUpdated = await thisService.Model.findByIdAndUpdate(
        quotationItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(quotationItemUpdated.quotation.toString(), options.quotation.toString());
assert.strictEqual(quotationItemUpdated.part.toString(), options.part.toString());
assert.strictEqual(quotationItemUpdated.quantity, options.quantity);
assert.strictEqual(quotationItemUpdated.UnitPrice, options.UnitPrice);
    });
  });

  describe("#delete", async () => {
    it("should delete a quotationItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("customerSalesOrders").Model.findByIdAndDelete(customerSalesOrdersCreated._id);
await app.service("irmsQuotations").Model.findByIdAndDelete(irmsQuotationsCreated._id);
await app.service("partsMaster").Model.findByIdAndDelete(partsMasterCreated._id);;

      const quotationItemDeleted = await thisService.Model.findByIdAndDelete(quotationItemCreated._id);
      assert.strictEqual(quotationItemDeleted._id.toString(), quotationItemCreated._id.toString());
    });
  });
});