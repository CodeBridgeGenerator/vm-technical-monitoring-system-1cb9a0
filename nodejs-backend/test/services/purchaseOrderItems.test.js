const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("purchaseOrderItems service", async () => {
  let thisService;
  let purchaseOrderItemCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"purchaseOrder":"parentObjectId","quotation":"parentObjectId","salesOrder":"parentObjectId","company":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const customerSalesOrdersCreated = await app.service("customerSalesOrders").Model.create({"purchaseOrder":"parentObjectId","quotation":"parentObjectId","salesOrder":"parentObjectId","company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value"});
const irmsQuotationsCreated = await app.service("irmsQuotations").Model.create({"purchaseOrder":"parentObjectId","quotation":"parentObjectId","salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.930Z","quotationIndex":"new value"});
const customerPurchaseOrdersCreated = await app.service("customerPurchaseOrders").Model.create({"purchaseOrder":"parentObjectId","quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.930Z","quotationIndex":"new value","purchaseOrderDate":"2026-03-17T15:06:11.930Z","deliveryDate":"2026-03-17T15:06:11.930Z","purchaseOrderId":"new value"});
const partsMasterCreated = await app.service("partsMaster").Model.create({"purchaseOrder":`${customerPurchaseOrdersCreated._id}`,"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.930Z","quotationIndex":"new value","purchaseOrderDate":"2026-03-17T15:06:11.930Z","deliveryDate":"2026-03-17T15:06:11.930Z","purchaseOrderId":"new value","part":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23});

  beforeEach(async () => {
    thisService = await app.service("purchaseOrderItems");

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
    assert.ok(thisService, "Registered the service (purchaseOrderItems)");
  });

  describe("#create", () => {
    const options = {"purchaseOrder":`${customerPurchaseOrdersCreated._id}`,"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.930Z","quotationIndex":"new value","purchaseOrderDate":"2026-03-17T15:06:11.930Z","deliveryDate":"2026-03-17T15:06:11.930Z","purchaseOrderId":"new value","part":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"unitPrice":23};

    beforeEach(async () => {
      purchaseOrderItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new purchaseOrderItem", () => {
      assert.strictEqual(purchaseOrderItemCreated.purchaseOrder.toString(), options.purchaseOrder.toString());
assert.strictEqual(purchaseOrderItemCreated.part.toString(), options.part.toString());
assert.strictEqual(purchaseOrderItemCreated.quantity, options.quantity);
assert.strictEqual(purchaseOrderItemCreated.unitPrice, options.unitPrice);
    });
  });

  describe("#get", () => {
    it("should retrieve a purchaseOrderItem by ID", async () => {
      const retrieved = await thisService.Model.findById(purchaseOrderItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), purchaseOrderItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"purchaseOrder":`${customerPurchaseOrdersCreated._id}`,"part":`${partsMasterCreated._id}`,"quantity":100,"unitPrice":100};

    it("should update an existing purchaseOrderItem ", async () => {
      const purchaseOrderItemUpdated = await thisService.Model.findByIdAndUpdate(
        purchaseOrderItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(purchaseOrderItemUpdated.purchaseOrder.toString(), options.purchaseOrder.toString());
assert.strictEqual(purchaseOrderItemUpdated.part.toString(), options.part.toString());
assert.strictEqual(purchaseOrderItemUpdated.quantity, options.quantity);
assert.strictEqual(purchaseOrderItemUpdated.unitPrice, options.unitPrice);
    });
  });

  describe("#delete", async () => {
    it("should delete a purchaseOrderItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("customerSalesOrders").Model.findByIdAndDelete(customerSalesOrdersCreated._id);
await app.service("irmsQuotations").Model.findByIdAndDelete(irmsQuotationsCreated._id);
await app.service("customerPurchaseOrders").Model.findByIdAndDelete(customerPurchaseOrdersCreated._id);
await app.service("partsMaster").Model.findByIdAndDelete(partsMasterCreated._id);;

      const purchaseOrderItemDeleted = await thisService.Model.findByIdAndDelete(purchaseOrderItemCreated._id);
      assert.strictEqual(purchaseOrderItemDeleted._id.toString(), purchaseOrderItemCreated._id.toString());
    });
  });
});