const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("customerSalesOrders service", async () => {
  let thisService;
  let customerSalesOrderCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"company":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});

  beforeEach(async () => {
    thisService = await app.service("customerSalesOrders");

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
    assert.ok(thisService, "Registered the service (customerSalesOrders)");
  });

  describe("#create", () => {
    const options = {"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value"};

    beforeEach(async () => {
      customerSalesOrderCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new customerSalesOrder", () => {
      assert.strictEqual(customerSalesOrderCreated.company.toString(), options.company.toString());
assert.strictEqual(customerSalesOrderCreated.salesOrderId, options.salesOrderId);
assert.strictEqual(customerSalesOrderCreated.salesOrderDate, options.salesOrderDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a customerSalesOrder by ID", async () => {
      const retrieved = await thisService.Model.findById(customerSalesOrderCreated._id);
      assert.strictEqual(retrieved._id.toString(), customerSalesOrderCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"company":`${usersCreated._id}`,"salesOrderId":"updated value","salesOrderDate":"updated value"};

    it("should update an existing customerSalesOrder ", async () => {
      const customerSalesOrderUpdated = await thisService.Model.findByIdAndUpdate(
        customerSalesOrderCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(customerSalesOrderUpdated.company.toString(), options.company.toString());
assert.strictEqual(customerSalesOrderUpdated.salesOrderId, options.salesOrderId);
assert.strictEqual(customerSalesOrderUpdated.salesOrderDate, options.salesOrderDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a customerSalesOrder", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);;

      const customerSalesOrderDeleted = await thisService.Model.findByIdAndDelete(customerSalesOrderCreated._id);
      assert.strictEqual(customerSalesOrderDeleted._id.toString(), customerSalesOrderCreated._id.toString());
    });
  });
});