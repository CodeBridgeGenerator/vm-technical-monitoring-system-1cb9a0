const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("externalPartRequests service", async () => {
  let thisService;
  let externalPartRequestCreated;
  let usersServiceResults;
  let users;

  const partsMasterCreated = await app.service("partsMaster").Model.create({"partName":"parentObjectId","serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23});
const usersCreated = await app.service("users").Model.create({"partName":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"status":true,"comment":"new value","requestedDate":"2026-03-17T15:06:12.075Z","externalTicket":"parentObjectId","machineId":"parentObjectId","ownership":"parentObjectId","name":"new value","email":"new value","password":"new value","remember_token":true});
const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"partName":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"status":true,"comment":"new value","requestedDate":"2026-03-17T15:06:12.075Z","externalTicket":"parentObjectId","machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":"parentObjectId"});
const machineMasterCreated = await app.service("machineMaster").Model.create({"partName":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"status":true,"comment":"new value","requestedDate":"2026-03-17T15:06:12.075Z","externalTicket":"parentObjectId","machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"comissionDate":"2026-03-17T15:06:12.075Z"});
const externalTicketsCreated = await app.service("externalTickets").Model.create({"partName":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"status":"new value","comment":"new value","requestedDate":"2026-03-17T15:06:12.075Z","externalTicket":"parentObjectId","machineId":`${machineMasterCreated._id}`,"ownership":`${usersCreated._id}`,"name":"new value","email":"new value","password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"comissionDate":"2026-03-17T15:06:12.075Z","checklistResponse":"new value","assignedSupervisor":"new value","assignedTechnician":"new value","startTime":"2026-03-17T15:06:12.075Z","endTime":"2026-03-17T15:06:12.075Z"});

  beforeEach(async () => {
    thisService = await app.service("externalPartRequests");

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
    assert.ok(thisService, "Registered the service (externalPartRequests)");
  });

  describe("#create", () => {
    const options = {"partName":`${partsMasterCreated._id}`,"serialNo":"new value","itemNo":"new value","description":"new value","quantity":23,"costAmount":23,"status":"new value","comment":"new value","requestedDate":"2026-03-17T15:06:12.075Z","externalTicket":`${externalTicketsCreated._id}`,"machineId":`${machineMasterCreated._id}`,"ownership":`${usersCreated._id}`,"name":"new value","email":"new value","password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"comissionDate":"2026-03-17T15:06:12.075Z","checklistResponse":"new value","assignedSupervisor":"new value","assignedTechnician":"new value","startTime":"2026-03-17T15:06:12.075Z","endTime":"2026-03-17T15:06:12.075Z","technician":"parentObjectId","approvedDate":"2026-03-17T15:06:12.076Z"};

    beforeEach(async () => {
      externalPartRequestCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new externalPartRequest", () => {
      assert.strictEqual(externalPartRequestCreated.partName.toString(), options.partName.toString());
assert.strictEqual(externalPartRequestCreated.quantity, options.quantity);
assert.strictEqual(externalPartRequestCreated.status, options.status);
assert.strictEqual(externalPartRequestCreated.comment, options.comment);
assert.strictEqual(externalPartRequestCreated.requestedDate.toISOString(), options.requestedDate);
assert.strictEqual(externalPartRequestCreated.externalTicket.toString(), options.externalTicket.toString());
assert.strictEqual(externalPartRequestCreated.technician.toString(), options.technician.toString());
assert.strictEqual(externalPartRequestCreated.approvedDate.toISOString(), options.approvedDate);
    });
  });

  describe("#get", () => {
    it("should retrieve a externalPartRequest by ID", async () => {
      const retrieved = await thisService.Model.findById(externalPartRequestCreated._id);
      assert.strictEqual(retrieved._id.toString(), externalPartRequestCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"partName":`${partsMasterCreated._id}`,"quantity":100,"status":"updated value","comment":"updated value","requestedDate":"2026-03-17T15:06:12.075Z","externalTicket":`${externalTicketsCreated._id}`,"technician":`${profilesCreated._id}`,"approvedDate":"2026-03-17T15:06:12.076Z"};

    it("should update an existing externalPartRequest ", async () => {
      const externalPartRequestUpdated = await thisService.Model.findByIdAndUpdate(
        externalPartRequestCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(externalPartRequestUpdated.partName.toString(), options.partName.toString());
assert.strictEqual(externalPartRequestUpdated.quantity, options.quantity);
assert.strictEqual(externalPartRequestUpdated.status, options.status);
assert.strictEqual(externalPartRequestUpdated.comment, options.comment);
assert.strictEqual(externalPartRequestUpdated.requestedDate.toISOString(), options.requestedDate);
assert.strictEqual(externalPartRequestUpdated.externalTicket.toString(), options.externalTicket.toString());
assert.strictEqual(externalPartRequestUpdated.technician.toString(), options.technician.toString());
assert.strictEqual(externalPartRequestUpdated.approvedDate.toISOString(), options.approvedDate);
    });
  });

  describe("#delete", async () => {
    it("should delete a externalPartRequest", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("partsMaster").Model.findByIdAndDelete(partsMasterCreated._id);
await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);
await app.service("machineMaster").Model.findByIdAndDelete(machineMasterCreated._id);
await app.service("externalTickets").Model.findByIdAndDelete(externalTicketsCreated._id);;

      const externalPartRequestDeleted = await thisService.Model.findByIdAndDelete(externalPartRequestCreated._id);
      assert.strictEqual(externalPartRequestDeleted._id.toString(), externalPartRequestCreated._id.toString());
    });
  });
});