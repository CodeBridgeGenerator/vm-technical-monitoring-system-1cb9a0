const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("salesOrderItems service", async () => {
  let thisService;
  let salesOrderItemCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"salesOrder":"parentObjectId","company":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const customerSalesOrdersCreated = await app.service("customerSalesOrders").Model.create({"salesOrder":"parentObjectId","company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value"});
const partsMasterCreated = await app.service("partsMaster").Model.create({"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","part":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23});

  beforeEach(async () => {
    thisService = await app.service("salesOrderItems");

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
    assert.ok(thisService, "Registered the service (salesOrderItems)");
  });

  describe("#create", () => {
    const options = {"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","part":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23};

    beforeEach(async () => {
      salesOrderItemCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new salesOrderItem", () => {
      assert.strictEqual(salesOrderItemCreated.salesOrder.toString(), options.salesOrder.toString());
assert.strictEqual(salesOrderItemCreated.part.toString(), options.part.toString());
assert.strictEqual(salesOrderItemCreated.quantity, options.quantity);
    });
  });

  describe("#get", () => {
    it("should retrieve a salesOrderItem by ID", async () => {
      const retrieved = await thisService.Model.findById(salesOrderItemCreated._id);
      assert.strictEqual(retrieved._id.toString(), salesOrderItemCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"salesOrder":`${customerSalesOrdersCreated._id}`,"part":`${partsMasterCreated._id}`,"quantity":100};

    it("should update an existing salesOrderItem ", async () => {
      const salesOrderItemUpdated = await thisService.Model.findByIdAndUpdate(
        salesOrderItemCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(salesOrderItemUpdated.salesOrder.toString(), options.salesOrder.toString());
assert.strictEqual(salesOrderItemUpdated.part.toString(), options.part.toString());
assert.strictEqual(salesOrderItemUpdated.quantity, options.quantity);
    });
  });

  describe("#delete", async () => {
    it("should delete a salesOrderItem", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("customerSalesOrders").Model.findByIdAndDelete(customerSalesOrdersCreated._id);
await app.service("partsMaster").Model.findByIdAndDelete(partsMasterCreated._id);;

      const salesOrderItemDeleted = await thisService.Model.findByIdAndDelete(salesOrderItemCreated._id);
      assert.strictEqual(salesOrderItemDeleted._id.toString(), salesOrderItemCreated._id.toString());
    });
  });
});