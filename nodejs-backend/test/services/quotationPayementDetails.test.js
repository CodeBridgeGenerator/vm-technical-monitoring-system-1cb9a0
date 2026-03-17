const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("quotationPayementDetails service", async () => {
  let thisService;
  let quotationPayementDetailCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"quotationIndex":"parentObjectId","salesOrder":"parentObjectId","company":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const customerSalesOrdersCreated = await app.service("customerSalesOrders").Model.create({"quotationIndex":"parentObjectId","salesOrder":"parentObjectId","company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value"});
const irmsQuotationsCreated = await app.service("irmsQuotations").Model.create({"quotationIndex":"new value","salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:12.194Z"});

  beforeEach(async () => {
    thisService = await app.service("quotationPayementDetails");

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
    assert.ok(thisService, "Registered the service (quotationPayementDetails)");
  });

  describe("#create", () => {
    const options = {"quotationIndex":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:12.194Z","description":"new value"};

    beforeEach(async () => {
      quotationPayementDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new quotationPayementDetail", () => {
      assert.strictEqual(quotationPayementDetailCreated.quotationIndex.toString(), options.quotationIndex.toString());
assert.strictEqual(quotationPayementDetailCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a quotationPayementDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(quotationPayementDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), quotationPayementDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"quotationIndex":`${irmsQuotationsCreated._id}`,"description":"updated value"};

    it("should update an existing quotationPayementDetail ", async () => {
      const quotationPayementDetailUpdated = await thisService.Model.findByIdAndUpdate(
        quotationPayementDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(quotationPayementDetailUpdated.quotationIndex.toString(), options.quotationIndex.toString());
assert.strictEqual(quotationPayementDetailUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a quotationPayementDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("customerSalesOrders").Model.findByIdAndDelete(customerSalesOrdersCreated._id);
await app.service("irmsQuotations").Model.findByIdAndDelete(irmsQuotationsCreated._id);;

      const quotationPayementDetailDeleted = await thisService.Model.findByIdAndDelete(quotationPayementDetailCreated._id);
      assert.strictEqual(quotationPayementDetailDeleted._id.toString(), quotationPayementDetailCreated._id.toString());
    });
  });
});