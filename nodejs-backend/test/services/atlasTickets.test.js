const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("atlasTickets service", async () => {
  let thisService;
  let atlasTicketCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"machineId":"parentObjectId","ownership":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":"parentObjectId","description":"new value"});
const machineMasterCreated = await app.service("machineMaster").Model.create({"machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:11.454Z"});

  beforeEach(async () => {
    thisService = await app.service("atlasTickets");

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
    assert.ok(thisService, "Registered the service (atlasTickets)");
  });

  describe("#create", () => {
    const options = {"machineId":`${machineMasterCreated._id}`,"ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":"new value","password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:11.454Z","checklistResponse":"new value","assignedSupervisor":"new value","assignedTechnician":"new value","startTime":"2026-03-17T15:06:11.454Z","endTime":"2026-03-17T15:06:11.454Z"};

    beforeEach(async () => {
      atlasTicketCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new atlasTicket", () => {
      assert.strictEqual(atlasTicketCreated.machineId.toString(), options.machineId.toString());
assert.strictEqual(atlasTicketCreated.checklistResponse, options.checklistResponse);
assert.strictEqual(atlasTicketCreated.assignedSupervisor, options.assignedSupervisor);
assert.strictEqual(atlasTicketCreated.assignedTechnician, options.assignedTechnician);
assert.strictEqual(atlasTicketCreated.status, options.status);
assert.strictEqual(atlasTicketCreated.startTime.toISOString(), options.startTime);
assert.strictEqual(atlasTicketCreated.endTime.toISOString(), options.endTime);
    });
  });

  describe("#get", () => {
    it("should retrieve a atlasTicket by ID", async () => {
      const retrieved = await thisService.Model.findById(atlasTicketCreated._id);
      assert.strictEqual(retrieved._id.toString(), atlasTicketCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"machineId":`${machineMasterCreated._id}`,"checklistResponse":"updated value","assignedSupervisor":"updated value","assignedTechnician":"updated value","status":"updated value","startTime":"2026-03-17T15:06:11.454Z","endTime":"2026-03-17T15:06:11.454Z"};

    it("should update an existing atlasTicket ", async () => {
      const atlasTicketUpdated = await thisService.Model.findByIdAndUpdate(
        atlasTicketCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(atlasTicketUpdated.machineId.toString(), options.machineId.toString());
assert.strictEqual(atlasTicketUpdated.checklistResponse, options.checklistResponse);
assert.strictEqual(atlasTicketUpdated.assignedSupervisor, options.assignedSupervisor);
assert.strictEqual(atlasTicketUpdated.assignedTechnician, options.assignedTechnician);
assert.strictEqual(atlasTicketUpdated.status, options.status);
assert.strictEqual(atlasTicketUpdated.startTime.toISOString(), options.startTime);
assert.strictEqual(atlasTicketUpdated.endTime.toISOString(), options.endTime);
    });
  });

  describe("#delete", async () => {
    it("should delete a atlasTicket", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);
await app.service("machineMaster").Model.findByIdAndDelete(machineMasterCreated._id);;

      const atlasTicketDeleted = await thisService.Model.findByIdAndDelete(atlasTicketCreated._id);
      assert.strictEqual(atlasTicketDeleted._id.toString(), atlasTicketCreated._id.toString());
    });
  });
});