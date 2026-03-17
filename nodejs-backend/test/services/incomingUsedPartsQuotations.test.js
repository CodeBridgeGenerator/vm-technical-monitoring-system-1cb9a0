const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("incomingUsedPartsQuotations service", async () => {
  let thisService;
  let incomingUsedPartsQuotationCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"quotation":"parentObjectId","salesOrder":"parentObjectId","company":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const customerSalesOrdersCreated = await app.service("customerSalesOrders").Model.create({"quotation":"parentObjectId","salesOrder":"parentObjectId","company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value"});
const irmsQuotationsCreated = await app.service("irmsQuotations").Model.create({"quotation":"parentObjectId","salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:12.405Z","quotationIndex":"new value"});
const usersCreated = await app.service("users").Model.create({"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:12.405Z","quotationIndex":"new value","incomingMachineTicket":"parentObjectId","machineId":"parentObjectId","ownership":"parentObjectId"});
const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:12.405Z","quotationIndex":"new value","incomingMachineTicket":"parentObjectId","machineId":"parentObjectId","ownership":`${usersCreated._id}`,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":"parentObjectId","description":"new value"});
const machineMasterCreated = await app.service("machineMaster").Model.create({"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:12.405Z","quotationIndex":"new value","incomingMachineTicket":"parentObjectId","machineId":"parentObjectId","ownership":`${usersCreated._id}`,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:12.406Z"});
const incomingMachineTicketsCreated = await app.service("incomingMachineTickets").Model.create({"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":"new value","password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:12.405Z","quotationIndex":"new value","incomingMachineTicket":"parentObjectId","machineId":`${machineMasterCreated._id}`,"ownership":`${usersCreated._id}`,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:12.406Z","checklistResponse":"new value","assignedSupervisors":"new value","selectedJobStations":"new value","startTime":"new value","endTime":"new value"});

  beforeEach(async () => {
    thisService = await app.service("incomingUsedPartsQuotations");

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
    assert.ok(thisService, "Registered the service (incomingUsedPartsQuotations)");
  });

  describe("#create", () => {
    const options = {"quotation":`${irmsQuotationsCreated._id}`,"salesOrder":`${customerSalesOrdersCreated._id}`,"company":`${usersCreated._id}`,"name":"new value","email":"new value","status":"new value","password":"new value","remember_token":true,"salesOrderId":"new value","salesOrderDate":"new value","validDate":"2026-03-17T15:06:12.405Z","quotationIndex":"new value","incomingMachineTicket":`${incomingMachineTicketsCreated._id}`,"machineId":`${machineMasterCreated._id}`,"ownership":`${usersCreated._id}`,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:12.406Z","checklistResponse":"new value","assignedSupervisors":"new value","selectedJobStations":"new value","startTime":"new value","endTime":"new value"};

    beforeEach(async () => {
      incomingUsedPartsQuotationCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new incomingUsedPartsQuotation", () => {
      assert.strictEqual(incomingUsedPartsQuotationCreated.quotation.toString(), options.quotation.toString());
assert.strictEqual(incomingUsedPartsQuotationCreated.incomingMachineTicket.toString(), options.incomingMachineTicket.toString());
    });
  });

  describe("#get", () => {
    it("should retrieve a incomingUsedPartsQuotation by ID", async () => {
      const retrieved = await thisService.Model.findById(incomingUsedPartsQuotationCreated._id);
      assert.strictEqual(retrieved._id.toString(), incomingUsedPartsQuotationCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"quotation":`${irmsQuotationsCreated._id}`,"incomingMachineTicket":`${incomingMachineTicketsCreated._id}`};

    it("should update an existing incomingUsedPartsQuotation ", async () => {
      const incomingUsedPartsQuotationUpdated = await thisService.Model.findByIdAndUpdate(
        incomingUsedPartsQuotationCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(incomingUsedPartsQuotationUpdated.quotation.toString(), options.quotation.toString());
assert.strictEqual(incomingUsedPartsQuotationUpdated.incomingMachineTicket.toString(), options.incomingMachineTicket.toString());
    });
  });

  describe("#delete", async () => {
    it("should delete a incomingUsedPartsQuotation", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("customerSalesOrders").Model.findByIdAndDelete(customerSalesOrdersCreated._id);
await app.service("irmsQuotations").Model.findByIdAndDelete(irmsQuotationsCreated._id);
await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);
await app.service("machineMaster").Model.findByIdAndDelete(machineMasterCreated._id);
await app.service("incomingMachineTickets").Model.findByIdAndDelete(incomingMachineTicketsCreated._id);;

      const incomingUsedPartsQuotationDeleted = await thisService.Model.findByIdAndDelete(incomingUsedPartsQuotationCreated._id);
      assert.strictEqual(incomingUsedPartsQuotationDeleted._id.toString(), incomingUsedPartsQuotationCreated._id.toString());
    });
  });
});