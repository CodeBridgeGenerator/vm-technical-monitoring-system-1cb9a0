const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("incomingMachineTickets service", async () => {
  let thisService;
  let incomingMachineTicketCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"machineId":"parentObjectId","ownership":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":"parentObjectId","description":"new value"});
const machineMasterCreated = await app.service("machineMaster").Model.create({"machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:11.472Z"});

  beforeEach(async () => {
    thisService = await app.service("incomingMachineTickets");

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
    assert.ok(thisService, "Registered the service (incomingMachineTickets)");
  });

  describe("#create", () => {
    const options = {"machineId":`${machineMasterCreated._id}`,"ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":"new value","password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:11.472Z","checklistResponse":"new value","assignedSupervisors":"new value","selectedJobStations":"new value","startTime":"new value","endTime":"new value"};

    beforeEach(async () => {
      incomingMachineTicketCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new incomingMachineTicket", () => {
      assert.strictEqual(incomingMachineTicketCreated.machineId.toString(), options.machineId.toString());
assert.strictEqual(incomingMachineTicketCreated.checklistResponse, options.checklistResponse);
assert.strictEqual(incomingMachineTicketCreated.assignedSupervisors, options.assignedSupervisors);
assert.strictEqual(incomingMachineTicketCreated.selectedJobStations, options.selectedJobStations);
assert.strictEqual(incomingMachineTicketCreated.startTime, options.startTime);
assert.strictEqual(incomingMachineTicketCreated.endTime, options.endTime);
assert.strictEqual(incomingMachineTicketCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a incomingMachineTicket by ID", async () => {
      const retrieved = await thisService.Model.findById(incomingMachineTicketCreated._id);
      assert.strictEqual(retrieved._id.toString(), incomingMachineTicketCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"machineId":`${machineMasterCreated._id}`,"checklistResponse":"updated value","assignedSupervisors":"updated value","selectedJobStations":"updated value","startTime":"updated value","endTime":"updated value","status":"updated value"};

    it("should update an existing incomingMachineTicket ", async () => {
      const incomingMachineTicketUpdated = await thisService.Model.findByIdAndUpdate(
        incomingMachineTicketCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(incomingMachineTicketUpdated.machineId.toString(), options.machineId.toString());
assert.strictEqual(incomingMachineTicketUpdated.checklistResponse, options.checklistResponse);
assert.strictEqual(incomingMachineTicketUpdated.assignedSupervisors, options.assignedSupervisors);
assert.strictEqual(incomingMachineTicketUpdated.selectedJobStations, options.selectedJobStations);
assert.strictEqual(incomingMachineTicketUpdated.startTime, options.startTime);
assert.strictEqual(incomingMachineTicketUpdated.endTime, options.endTime);
assert.strictEqual(incomingMachineTicketUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a incomingMachineTicket", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);
await app.service("machineMaster").Model.findByIdAndDelete(machineMasterCreated._id);;

      const incomingMachineTicketDeleted = await thisService.Model.findByIdAndDelete(incomingMachineTicketCreated._id);
      assert.strictEqual(incomingMachineTicketDeleted._id.toString(), incomingMachineTicketCreated._id.toString());
    });
  });
});