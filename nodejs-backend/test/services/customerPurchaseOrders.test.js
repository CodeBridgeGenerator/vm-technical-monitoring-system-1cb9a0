const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("customerPurchaseOrders service", async () => {
  let thisService;
  let customerPurchaseOrderCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"quotation":"parentObjectId","salesOrder":"parentObjectId","company":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const customerSalesOrdersCreated = await app.service("customerSalesOrders").Model.create({"quotation":"parentObjectId","salesOrder":"parentObjectId","company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value"});
const irmsQuotationsCreated = await app.service("irmsQuotations").Model.create({"quotation":"parentObjectId","salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.908Z","quotationIndex":"new value"});

  beforeEach(async () => {
    thisService = await app.service("customerPurchaseOrders");

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
    assert.ok(thisService, "Registered the service (customerPurchaseOrders)");
  });

  describe("#create", () => {
    const options = {"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.908Z","quotationIndex":"new value","purchaseOrderDate":"2026-03-17T15:06:11.908Z","deliveryDate":"2026-03-17T15:06:11.908Z","purchaseOrderId":"new value"};

    beforeEach(async () => {
      customerPurchaseOrderCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new customerPurchaseOrder", () => {
      assert.strictEqual(customerPurchaseOrderCreated.quotation.toString(), options.quotation.toString());
assert.strictEqual(customerPurchaseOrderCreated.purchaseOrderDate.toISOString(), options.purchaseOrderDate);
assert.strictEqual(customerPurchaseOrderCreated.deliveryDate.toISOString(), options.deliveryDate);
assert.strictEqual(customerPurchaseOrderCreated.purchaseOrderId, options.purchaseOrderId);
    });
  });

  describe("#get", () => {
    it("should retrieve a customerPurchaseOrder by ID", async () => {
      const retrieved = await thisService.Model.findById(customerPurchaseOrderCreated._id);
      assert.strictEqual(retrieved._id.toString(), customerPurchaseOrderCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"quotation":`${irmsQuotationsCreated._id}`,"purchaseOrderDate":"2026-03-17T15:06:11.908Z","deliveryDate":"2026-03-17T15:06:11.908Z","purchaseOrderId":"updated value"};

    it("should update an existing customerPurchaseOrder ", async () => {
      const customerPurchaseOrderUpdated = await thisService.Model.findByIdAndUpdate(
        customerPurchaseOrderCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(customerPurchaseOrderUpdated.quotation.toString(), options.quotation.toString());
assert.strictEqual(customerPurchaseOrderUpdated.purchaseOrderDate.toISOString(), options.purchaseOrderDate);
assert.strictEqual(customerPurchaseOrderUpdated.deliveryDate.toISOString(), options.deliveryDate);
assert.strictEqual(customerPurchaseOrderUpdated.purchaseOrderId, options.purchaseOrderId);
    });
  });

  describe("#delete", async () => {
    it("should delete a customerPurchaseOrder", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("customerSalesOrders").Model.findByIdAndDelete(customerSalesOrdersCreated._id);
await app.service("irmsQuotations").Model.findByIdAndDelete(irmsQuotationsCreated._id);;

      const customerPurchaseOrderDeleted = await thisService.Model.findByIdAndDelete(customerPurchaseOrderCreated._id);
      assert.strictEqual(customerPurchaseOrderDeleted._id.toString(), customerPurchaseOrderCreated._id.toString());
    });
  });
});