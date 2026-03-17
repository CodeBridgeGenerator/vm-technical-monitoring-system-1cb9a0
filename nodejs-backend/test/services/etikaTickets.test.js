const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("etikaTickets service", async () => {
  let thisService;
  let etikaTicketCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"machineId":"parentObjectId","ownership":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":"parentObjectId","description":"new value"});
const machineMasterCreated = await app.service("machineMaster").Model.create({"machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:12.140Z"});

  beforeEach(async () => {
    thisService = await app.service("etikaTickets");

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
    assert.ok(thisService, "Registered the service (etikaTickets)");
  });

  describe("#create", () => {
    const options = {"machineId":`${machineMasterCreated._id}`,"ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":"new value","password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:12.140Z","checklistResponse":"new value","etikaRequestor":"parentObjectId","assignedSupervisor":"parentObjectId","assignedTechnician":"parentObjectId","startTime":"2026-03-17T15:06:12.140Z","endTime":"2026-03-17T15:06:12.140Z","supervisorStartTime":"2026-03-17T15:06:12.140Z","supervisorEndTime":"2026-03-17T15:06:12.140Z","technicianStartTime":"2026-03-17T15:06:12.140Z","technicianEndTime":"2026-03-17T15:06:12.140Z","comments":"new value","machineImage":"new value"};

    beforeEach(async () => {
      etikaTicketCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new etikaTicket", () => {
      assert.strictEqual(etikaTicketCreated.machineId.toString(), options.machineId.toString());
assert.strictEqual(etikaTicketCreated.checklistResponse, options.checklistResponse);
assert.strictEqual(etikaTicketCreated.etikaRequestor.toString(), options.etikaRequestor.toString());
assert.strictEqual(etikaTicketCreated.assignedSupervisor.toString(), options.assignedSupervisor.toString());
assert.strictEqual(etikaTicketCreated.assignedTechnician.toString(), options.assignedTechnician.toString());
assert.strictEqual(etikaTicketCreated.status, options.status);
assert.strictEqual(etikaTicketCreated.startTime.toISOString(), options.startTime);
assert.strictEqual(etikaTicketCreated.endTime.toISOString(), options.endTime);
assert.strictEqual(etikaTicketCreated.supervisorStartTime.toISOString(), options.supervisorStartTime);
assert.strictEqual(etikaTicketCreated.supervisorEndTime.toISOString(), options.supervisorEndTime);
assert.strictEqual(etikaTicketCreated.technicianStartTime.toISOString(), options.technicianStartTime);
assert.strictEqual(etikaTicketCreated.technicianEndTime.toISOString(), options.technicianEndTime);
assert.strictEqual(etikaTicketCreated.comments, options.comments);
assert.strictEqual(etikaTicketCreated.machineImage, options.machineImage);
    });
  });

  describe("#get", () => {
    it("should retrieve a etikaTicket by ID", async () => {
      const retrieved = await thisService.Model.findById(etikaTicketCreated._id);
      assert.strictEqual(retrieved._id.toString(), etikaTicketCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"machineId":`${machineMasterCreated._id}`,"checklistResponse":"updated value","etikaRequestor":`${profilesCreated._id}`,"assignedSupervisor":`${profilesCreated._id}`,"assignedTechnician":`${profilesCreated._id}`,"status":"updated value","startTime":"2026-03-17T15:06:12.140Z","endTime":"2026-03-17T15:06:12.140Z","supervisorStartTime":"2026-03-17T15:06:12.140Z","supervisorEndTime":"2026-03-17T15:06:12.140Z","technicianStartTime":"2026-03-17T15:06:12.140Z","technicianEndTime":"2026-03-17T15:06:12.140Z","comments":"updated value","machineImage":"updated value"};

    it("should update an existing etikaTicket ", async () => {
      const etikaTicketUpdated = await thisService.Model.findByIdAndUpdate(
        etikaTicketCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(etikaTicketUpdated.machineId.toString(), options.machineId.toString());
assert.strictEqual(etikaTicketUpdated.checklistResponse, options.checklistResponse);
assert.strictEqual(etikaTicketUpdated.etikaRequestor.toString(), options.etikaRequestor.toString());
assert.strictEqual(etikaTicketUpdated.assignedSupervisor.toString(), options.assignedSupervisor.toString());
assert.strictEqual(etikaTicketUpdated.assignedTechnician.toString(), options.assignedTechnician.toString());
assert.strictEqual(etikaTicketUpdated.status, options.status);
assert.strictEqual(etikaTicketUpdated.startTime.toISOString(), options.startTime);
assert.strictEqual(etikaTicketUpdated.endTime.toISOString(), options.endTime);
assert.strictEqual(etikaTicketUpdated.supervisorStartTime.toISOString(), options.supervisorStartTime);
assert.strictEqual(etikaTicketUpdated.supervisorEndTime.toISOString(), options.supervisorEndTime);
assert.strictEqual(etikaTicketUpdated.technicianStartTime.toISOString(), options.technicianStartTime);
assert.strictEqual(etikaTicketUpdated.technicianEndTime.toISOString(), options.technicianEndTime);
assert.strictEqual(etikaTicketUpdated.comments, options.comments);
assert.strictEqual(etikaTicketUpdated.machineImage, options.machineImage);
    });
  });

  describe("#delete", async () => {
    it("should delete a etikaTicket", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);
await app.service("machineMaster").Model.findByIdAndDelete(machineMasterCreated._id);;

      const etikaTicketDeleted = await thisService.Model.findByIdAndDelete(etikaTicketCreated._id);
      assert.strictEqual(etikaTicketDeleted._id.toString(), etikaTicketCreated._id.toString());
    });
  });
});