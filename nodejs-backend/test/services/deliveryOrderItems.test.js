const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("deliveryOrderItems service", async () => {
  let thisService;
  let deliveryOrderItemCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"deliveryOrders":"parentObjectId","purchaseOrder":"parentObjectId","quotation":"parentObjectId","salesOrder":"parentObjectId","company":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const customerSalesOrdersCreated = await app.service("customerSalesOrders").Model.create({"deliveryOrders":"parentObjectId","purchaseOrder":"parentObjectId","quotation":"parentObjectId","salesOrder":"parentObjectId","company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value"});
const irmsQuotationsCreated = await app.service("irmsQuotations").Model.create({"deliveryOrders":"parentObjectId","purchaseOrder":"parentObjectId","quotation":"parentObjectId","salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.960Z","quotationIndex":"new value"});
const customerPurchaseOrdersCreated = await app.service("customerPurchaseOrders").Model.create({"deliveryOrders":"parentObjectId","purchaseOrder":"parentObjectId","quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.960Z","quotationIndex":"new value","purchaseOrderDate":"2026-03-17T15:06:11.960Z","deliveryDate":"2026-03-17T15:06:11.960Z","purchaseOrderId":"new value"});
const irmsDeliveryOrdersCreated = await app.service("irmsDeliveryOrders").Model.create({"deliveryOrders":"parentObjectId","purchaseOrder":`${customerPurchaseOrdersCreated._id}`,"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.960Z","quotationIndex":"new value","purchaseOrderDate":"2026-03-17T15:06:11.960Z","deliveryDate":"2026-03-17T15:06:11.960Z","purchaseOrderId":"new value","deliveryOrderId":"new value"});
const partsMasterCreated = await app.service("partsMaster").Model.create({"deliveryOrders":`${irmsDeliveryOrdersCreated._id}`,"purchaseOrder":`${customerPurchaseOrdersCreated._id}`,"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.960Z","quotationIndex":"new value","purchaseOrderDate":"2026-03-17T15:06:11.960Z","deliveryDate":"2026-03-17T15:06:11.960Z","purchaseOrderId":"new value","deliveryOrderId":"new value","part":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23});

  beforeEach(async () => {
    thisService = await app.service("deliveryOrderItems");

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
    assert.ok(thisService, "Registered the service (deliveryOrderItems)");
  });

  describe("#create", () => {
    const options = {"deliveryOrders":`${irmsDeliveryOrdersCreated._id}`,"purchaseOrder":`${customerPurchaseOrdersCreated._id}`,"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:11.960Z","quotationIndex":"new value","purchaseOrderDate":"2026-03-17T15:06:11.960Z","deliveryDate":"2026-03-17T15:06:11.960Z","purchaseOrderId":"new value","deliveryOrderId":"new value","part":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23};

    beforeEach(async () => {
      deliveryOrderItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new deliveryOrderItem", () => {
      assert.strictEqual(deliveryOrderItemCreated.deliveryOrders.toString(), options.deliveryOrders.toString());
assert.strictEqual(deliveryOrderItemCreated.part.toString(), options.part.toString());
assert.strictEqual(deliveryOrderItemCreated.quantity, options.quantity);
    });
  });

  describe("#get", () => {
    it("should retrieve a deliveryOrderItem by ID", async () => {
      const retrieved = await thisService.Model.findById(deliveryOrderItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), deliveryOrderItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"deliveryOrders":`${irmsDeliveryOrdersCreated._id}`,"part":`${partsMasterCreated._id}`,"quantity":100};

    it("should update an existing deliveryOrderItem ", async () => {
      const deliveryOrderItemUpdated = await thisService.Model.findByIdAndUpdate(
        deliveryOrderItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(deliveryOrderItemUpdated.deliveryOrders.toString(), options.deliveryOrders.toString());
assert.strictEqual(deliveryOrderItemUpdated.part.toString(), options.part.toString());
assert.strictEqual(deliveryOrderItemUpdated.quantity, options.quantity);
    });
  });

  describe("#delete", async () => {
    it("should delete a deliveryOrderItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("customerSalesOrders").Model.findByIdAndDelete(customerSalesOrdersCreated._id);
await app.service("irmsQuotations").Model.findByIdAndDelete(irmsQuotationsCreated._id);
await app.service("customerPurchaseOrders").Model.findByIdAndDelete(customerPurchaseOrdersCreated._id);
await app.service("irmsDeliveryOrders").Model.findByIdAndDelete(irmsDeliveryOrdersCreated._id);
await app.service("partsMaster").Model.findByIdAndDelete(partsMasterCreated._id);;

      const deliveryOrderItemDeleted = await thisService.Model.findByIdAndDelete(deliveryOrderItemCreated._id);
      assert.strictEqual(deliveryOrderItemDeleted._id.toString(), deliveryOrderItemCreated._id.toString());
    });
  });
});