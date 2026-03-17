const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("irmsDeliveryOrders service", async () => {
  let thisService;
  let irmsDeliveryOrderCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"purchaseOrder":"parentObjectId","quotation":"parentObjectId","salesOrder":"parentObjectId","company":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const customerSalesOrdersCreated = await app.service("customerSalesOrders").Model.create({"purchaseOrder":"parentObjectId","quotation":"parentObjectId","salesOrder":"parentObjectId","company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value"});
const irmsQuotationsCreated = await app.service("irmsQuotations").Model.create({"purchaseOrder":"parentObjectId","quotation":"parentObjectId","salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.946Z","quotationIndex":"new value"});
const customerPurchaseOrdersCreated = await app.service("customerPurchaseOrders").Model.create({"purchaseOrder":"parentObjectId","quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.946Z","quotationIndex":"new value","purchaseOrderDate":"2026-03-17T15:06:11.946Z","deliveryDate":"2026-03-17T15:06:11.946Z","purchaseOrderId":"new value"});

  beforeEach(async () => {
    thisService = await app.service("irmsDeliveryOrders");

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
    assert.ok(thisService, "Registered the service (irmsDeliveryOrders)");
  });

  describe("#create", () => {
    const options = {"purchaseOrder":`${customerPurchaseOrdersCreated._id}`,"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.946Z","quotationIndex":"new value","purchaseOrderDate":"2026-03-17T15:06:11.946Z","deliveryDate":"2026-03-17T15:06:11.946Z","purchaseOrderId":"new value","deliveryOrderId":"new value"};

    beforeEach(async () => {
      irmsDeliveryOrderCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new irmsDeliveryOrder", () => {
      assert.strictEqual(irmsDeliveryOrderCreated.purchaseOrder.toString(), options.purchaseOrder.toString());
assert.strictEqual(irmsDeliveryOrderCreated.deliveryOrderId, options.deliveryOrderId);
    });
  });

  describe("#get", () => {
    it("should retrieve a irmsDeliveryOrder by ID", async () => {
      const retrieved = await thisService.Model.findById(irmsDeliveryOrderCreated._id);
      assert.strictEqual(retrieved._id.toString(), irmsDeliveryOrderCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"purchaseOrder":`${customerPurchaseOrdersCreated._id}`,"deliveryOrderId":"updated value"};

    it("should update an existing irmsDeliveryOrder ", async () => {
      const irmsDeliveryOrderUpdated = await thisService.Model.findByIdAndUpdate(
        irmsDeliveryOrderCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(irmsDeliveryOrderUpdated.purchaseOrder.toString(), options.purchaseOrder.toString());
assert.strictEqual(irmsDeliveryOrderUpdated.deliveryOrderId, options.deliveryOrderId);
    });
  });

  describe("#delete", async () => {
    it("should delete a irmsDeliveryOrder", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("customerSalesOrders").Model.findByIdAndDelete(customerSalesOrdersCreated._id);
await app.service("irmsQuotations").Model.findByIdAndDelete(irmsQuotationsCreated._id);
await app.service("customerPurchaseOrders").Model.findByIdAndDelete(customerPurchaseOrdersCreated._id);;

      const irmsDeliveryOrderDeleted = await thisService.Model.findByIdAndDelete(irmsDeliveryOrderCreated._id);
      assert.strictEqual(irmsDeliveryOrderDeleted._id.toString(), irmsDeliveryOrderCreated._id.toString());
    });
  });
});