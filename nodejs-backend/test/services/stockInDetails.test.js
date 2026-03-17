const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("stockInDetails service", async () => {
  let thisService;
  let stockInDetailCreated;
  let usersServiceResults;
  let users;

  const warehouseMasterCreated = await app.service("warehouseMaster").Model.create({"model":"new value","serialNo":"new value","partNo":"new value","pricing":23,"quantity":23,"purchaseDate":"2026-03-17T15:06:11.728Z","partDescription":"new value","poNumber":"new value","doNumber":"new value","category":"new value","unitOfMeasurement":"new value","conditionOfTerms":"new value","warehouse":"parentObjectId","name":"new value","location":"new value"});

  beforeEach(async () => {
    thisService = await app.service("stockInDetails");

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
    assert.ok(thisService, "Registered the service (stockInDetails)");
  });

  describe("#create", () => {
    const options = {"model":"new value","serialNo":"new value","partNo":"new value","pricing":23,"quantity":23,"purchaseDate":"2026-03-17T15:06:11.728Z","partDescription":"new value","poNumber":"new value","doNumber":"new value","category":"new value","unitOfMeasurement":"new value","conditionOfTerms":"new value","warehouse":`${warehouseMasterCreated._id}`,"name":"new value","location":"new value"};

    beforeEach(async () => {
      stockInDetailCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new stockInDetail", () => {
      assert.strictEqual(stockInDetailCreated.model, options.model);
assert.strictEqual(stockInDetailCreated.serialNo, options.serialNo);
assert.strictEqual(stockInDetailCreated.partNo, options.partNo);
assert.strictEqual(stockInDetailCreated.pricing, options.pricing);
assert.strictEqual(stockInDetailCreated.quantity, options.quantity);
assert.strictEqual(stockInDetailCreated.purchaseDate.toISOString(), options.purchaseDate);
assert.strictEqual(stockInDetailCreated.partDescription, options.partDescription);
assert.strictEqual(stockInDetailCreated.poNumber, options.poNumber);
assert.strictEqual(stockInDetailCreated.doNumber, options.doNumber);
assert.strictEqual(stockInDetailCreated.category, options.category);
assert.strictEqual(stockInDetailCreated.unitOfMeasurement, options.unitOfMeasurement);
assert.strictEqual(stockInDetailCreated.conditionOfTerms, options.conditionOfTerms);
assert.strictEqual(stockInDetailCreated.warehouse.toString(), options.warehouse.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a stockInDetail by ID", async () => {
      const retrieved = await thisService.Model.findById(stockInDetailCreated._id);
      assert.strictEqual(retrieved._id.toString(), stockInDetailCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"model":"updated value","serialNo":"updated value","partNo":"updated value","pricing":100,"quantity":100,"purchaseDate":"2026-03-17T15:06:11.728Z","partDescription":"updated value","poNumber":"updated value","doNumber":"updated value","category":"updated value","unitOfMeasurement":"updated value","conditionOfTerms":"updated value","warehouse":`${warehouseMasterCreated._id}`};

    it("should update an existing stockInDetail ", async () => {
      const stockInDetailUpdated = await thisService.Model.findByIdAndUpdate(
        stockInDetailCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(stockInDetailUpdated.model, options.model);
assert.strictEqual(stockInDetailUpdated.serialNo, options.serialNo);
assert.strictEqual(stockInDetailUpdated.partNo, options.partNo);
assert.strictEqual(stockInDetailUpdated.pricing, options.pricing);
assert.strictEqual(stockInDetailUpdated.quantity, options.quantity);
assert.strictEqual(stockInDetailUpdated.purchaseDate.toISOString(), options.purchaseDate);
assert.strictEqual(stockInDetailUpdated.partDescription, options.partDescription);
assert.strictEqual(stockInDetailUpdated.poNumber, options.poNumber);
assert.strictEqual(stockInDetailUpdated.doNumber, options.doNumber);
assert.strictEqual(stockInDetailUpdated.category, options.category);
assert.strictEqual(stockInDetailUpdated.unitOfMeasurement, options.unitOfMeasurement);
assert.strictEqual(stockInDetailUpdated.conditionOfTerms, options.conditionOfTerms);
assert.strictEqual(stockInDetailUpdated.warehouse.toString(), options.warehouse.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a stockInDetail", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("warehouseMaster").Model.findByIdAndDelete(warehouseMasterCreated._id);;

      const stockInDetailDeleted = await thisService.Model.findByIdAndDelete(stockInDetailCreated._id);
      assert.strictEqual(stockInDetailDeleted._id.toString(), stockInDetailCreated._id.toString());
    });
  });
});