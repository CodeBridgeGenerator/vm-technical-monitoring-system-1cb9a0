const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("externalTickets service", async () => {
  let thisService;
  let externalTicketCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"machineId":"parentObjectId","ownership":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":"parentObjectId","description":"new value"});
const machineMasterCreated = await app.service("machineMaster").Model.create({"machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:11.432Z"});

  beforeEach(async () => {
    thisService = await app.service("externalTickets");

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
    assert.ok(thisService, "Registered the service (externalTickets)");
  });

  describe("#create", () => {
    const options = {"machineId":`${machineMasterCreated._id}`,"ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":"new value","password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:11.432Z","checklistResponse":"new value","assignedSupervisor":"new value","assignedTechnician":"new value","startTime":"2026-03-17T15:06:11.432Z","endTime":"2026-03-17T15:06:11.432Z"};

    beforeEach(async () => {
      externalTicketCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new externalTicket", () => {
      assert.strictEqual(externalTicketCreated.machineId.toString(), options.machineId.toString());
assert.strictEqual(externalTicketCreated.checklistResponse, options.checklistResponse);
assert.strictEqual(externalTicketCreated.assignedSupervisor, options.assignedSupervisor);
assert.strictEqual(externalTicketCreated.assignedTechnician, options.assignedTechnician);
assert.strictEqual(externalTicketCreated.status, options.status);
assert.strictEqual(externalTicketCreated.startTime.toISOString(), options.startTime);
assert.strictEqual(externalTicketCreated.endTime.toISOString(), options.endTime);
    });
  });

  describe("#get", () => {
    it("should retrieve a externalTicket by ID", async () => {
      const retrieved = await thisService.Model.findById(externalTicketCreated._id);
      assert.strictEqual(retrieved._id.toString(), externalTicketCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"machineId":`${machineMasterCreated._id}`,"checklistResponse":"updated value","assignedSupervisor":"updated value","assignedTechnician":"updated value","status":"updated value","startTime":"2026-03-17T15:06:11.432Z","endTime":"2026-03-17T15:06:11.432Z"};

    it("should update an existing externalTicket ", async () => {
      const externalTicketUpdated = await thisService.Model.findByIdAndUpdate(
        externalTicketCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(externalTicketUpdated.machineId.toString(), options.machineId.toString());
assert.strictEqual(externalTicketUpdated.checklistResponse, options.checklistResponse);
assert.strictEqual(externalTicketUpdated.assignedSupervisor, options.assignedSupervisor);
assert.strictEqual(externalTicketUpdated.assignedTechnician, options.assignedTechnician);
assert.strictEqual(externalTicketUpdated.status, options.status);
assert.strictEqual(externalTicketUpdated.startTime.toISOString(), options.startTime);
assert.strictEqual(externalTicketUpdated.endTime.toISOString(), options.endTime);
    });
  });

  describe("#delete", async () => {
    it("should delete a externalTicket", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);
await app.service("machineMaster").Model.findByIdAndDelete(machineMasterCreated._id);;

      const externalTicketDeleted = await thisService.Model.findByIdAndDelete(externalTicketCreated._id);
      assert.strictEqual(externalTicketDeleted._id.toString(), externalTicketCreated._id.toString());
    });
  });
});