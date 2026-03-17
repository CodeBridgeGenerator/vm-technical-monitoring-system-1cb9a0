const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("incomingMachineAbortHistory service", async () => {
  let thisService;
  let incomingMachineAbortHistoryCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"ticketId":"parentObjectId","machineId":"parentObjectId","ownership":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"ticketId":"parentObjectId","machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":"parentObjectId","description":"new value"});
const machineMasterCreated = await app.service("machineMaster").Model.create({"ticketId":"parentObjectId","machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:12.011Z"});
const incomingMachineTicketsCreated = await app.service("incomingMachineTickets").Model.create({"ticketId":"parentObjectId","machineId":`${machineMasterCreated._id}`,"ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":"new value","password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:12.011Z","checklistResponse":"new value","assignedSupervisors":"new value","selectedJobStations":"new value","startTime":"new value","endTime":"new value"});
const usersCreated = await app.service("users").Model.create({"ticketId":`${incomingMachineTicketsCreated._id}`,"machineId":`${machineMasterCreated._id}`,"ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:12.011Z","checklistResponse":"new value","assignedSupervisors":"new value","selectedJobStations":"new value","startTime":"new value","endTime":"new value","abortedBy":"parentObjectId"});

  beforeEach(async () => {
    thisService = await app.service("incomingMachineAbortHistory");

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
    assert.ok(thisService, "Registered the service (incomingMachineAbortHistory)");
  });

  describe("#create", () => {
    const options = {"ticketId":`${incomingMachineTicketsCreated._id}`,"machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":"new value","password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:12.011Z","checklistResponse":"new value","assignedSupervisors":"new value","selectedJobStations":"new value","startTime":"new value","endTime":"new value","abortedBy":`${usersCreated._id}`,"abortReason":"new value","abortedAt":"2026-03-17T15:06:12.011Z"};

    beforeEach(async () => {
      incomingMachineAbortHistoryCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new incomingMachineAbortHistory", () => {
      assert.strictEqual(incomingMachineAbortHistoryCreated.ticketId.toString(), options.ticketId.toString());
assert.strictEqual(incomingMachineAbortHistoryCreated.abortedBy.toString(), options.abortedBy.toString());
assert.strictEqual(incomingMachineAbortHistoryCreated.abortReason, options.abortReason);
assert.strictEqual(incomingMachineAbortHistoryCreated.abortedAt.toISOString(), options.abortedAt);
assert.strictEqual(incomingMachineAbortHistoryCreated.machineId.toString(), options.machineId.toString());
assert.strictEqual(incomingMachineAbortHistoryCreated.status, options.status);
    });
  });

  describe("#get", () => {
    it("should retrieve a incomingMachineAbortHistory by ID", async () => {
      const retrieved = await thisService.Model.findById(incomingMachineAbortHistoryCreated._id);
      assert.strictEqual(retrieved._id.toString(), incomingMachineAbortHistoryCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"ticketId":`${incomingMachineTicketsCreated._id}`,"abortedBy":`${usersCreated._id}`,"abortReason":"updated value","abortedAt":"2026-03-17T15:06:12.011Z","machineId":`${machineMasterCreated._id}`,"status":"updated value"};

    it("should update an existing incomingMachineAbortHistory ", async () => {
      const incomingMachineAbortHistoryUpdated = await thisService.Model.findByIdAndUpdate(
        incomingMachineAbortHistoryCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(incomingMachineAbortHistoryUpdated.ticketId.toString(), options.ticketId.toString());
assert.strictEqual(incomingMachineAbortHistoryUpdated.abortedBy.toString(), options.abortedBy.toString());
assert.strictEqual(incomingMachineAbortHistoryUpdated.abortReason, options.abortReason);
assert.strictEqual(incomingMachineAbortHistoryUpdated.abortedAt.toISOString(), options.abortedAt);
assert.strictEqual(incomingMachineAbortHistoryUpdated.machineId.toString(), options.machineId.toString());
assert.strictEqual(incomingMachineAbortHistoryUpdated.status, options.status);
    });
  });

  describe("#delete", async () => {
    it("should delete a incomingMachineAbortHistory", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);
await app.service("machineMaster").Model.findByIdAndDelete(machineMasterCreated._id);
await app.service("incomingMachineTickets").Model.findByIdAndDelete(incomingMachineTicketsCreated._id);;

      const incomingMachineAbortHistoryDeleted = await thisService.Model.findByIdAndDelete(incomingMachineAbortHistoryCreated._id);
      assert.strictEqual(incomingMachineAbortHistoryDeleted._id.toString(), incomingMachineAbortHistoryCreated._id.toString());
    });
  });
});