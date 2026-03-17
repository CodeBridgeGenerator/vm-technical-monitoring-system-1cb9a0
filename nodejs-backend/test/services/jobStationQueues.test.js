const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("jobStationQueues service", async () => {
  let thisService;
  let jobStationQueueCreated;
  let usersServiceResults;
  let users;

  const usersCreated = await app.service("users").Model.create({"incomingMachineTicketId":"parentObjectId","machineId":"parentObjectId","ownership":"parentObjectId","name":"new value","email":"new value","status":true,"password":"new value","remember_token":true});
const vendingMachinesCreated = await app.service("vendingMachines").Model.create({"incomingMachineTicketId":"parentObjectId","machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":"parentObjectId","description":"new value"});
const machineMasterCreated = await app.service("machineMaster").Model.create({"incomingMachineTicketId":"parentObjectId","machineId":"parentObjectId","ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":true,"password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:11.605Z"});
const incomingMachineTicketsCreated = await app.service("incomingMachineTickets").Model.create({"incomingMachineTicketId":"parentObjectId","machineId":`${machineMasterCreated._id}`,"ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":"new value","password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:11.605Z","checklistResponse":"new value","assignedSupervisors":"new value","selectedJobStations":"new value","startTime":"new value","endTime":"new value"});

  beforeEach(async () => {
    thisService = await app.service("jobStationQueues");

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
    assert.ok(thisService, "Registered the service (jobStationQueues)");
  });

  describe("#create", () => {
    const options = {"incomingMachineTicketId":`${incomingMachineTicketsCreated._id}`,"machineId":`${machineMasterCreated._id}`,"ownership":`${usersCreated._id}`,"name":"new value","email":"new value","status":"new value","password":"new value","remember_token":true,"vendingMachineCode":"new value","modelNo":"new value","serialNumber":23,"vendingMachineType":`${vendingMachinesCreated._id}`,"description":"new value","comissionDate":"2026-03-17T15:06:11.605Z","checklistResponse":"new value","assignedSupervisors":"new value","selectedJobStations":"new value","startTime":"new value","endTime":"new value","priority":23};

    beforeEach(async () => {
      jobStationQueueCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new jobStationQueue", () => {
      assert.strictEqual(jobStationQueueCreated.incomingMachineTicketId.toString(), options.incomingMachineTicketId.toString());
assert.strictEqual(jobStationQueueCreated.selectedJobStations, options.selectedJobStations);
assert.strictEqual(jobStationQueueCreated.status, options.status);
assert.strictEqual(jobStationQueueCreated.priority, options.priority);
    });
  });

  describe("#get", () => {
    it("should retrieve a jobStationQueue by ID", async () => {
      const retrieved = await thisService.Model.findById(jobStationQueueCreated._id);
      assert.strictEqual(retrieved._id.toString(), jobStationQueueCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"incomingMachineTicketId":`${incomingMachineTicketsCreated._id}`,"selectedJobStations":"updated value","status":"updated value","priority":100};

    it("should update an existing jobStationQueue ", async () => {
      const jobStationQueueUpdated = await thisService.Model.findByIdAndUpdate(
        jobStationQueueCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(jobStationQueueUpdated.incomingMachineTicketId.toString(), options.incomingMachineTicketId.toString());
assert.strictEqual(jobStationQueueUpdated.selectedJobStations, options.selectedJobStations);
assert.strictEqual(jobStationQueueUpdated.status, options.status);
assert.strictEqual(jobStationQueueUpdated.priority, options.priority);
    });
  });

  describe("#delete", async () => {
    it("should delete a jobStationQueue", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      await app.service("users").Model.findByIdAndDelete(usersCreated._id);
await app.service("vendingMachines").Model.findByIdAndDelete(vendingMachinesCreated._id);
await app.service("machineMaster").Model.findByIdAndDelete(machineMasterCreated._id);
await app.service("incomingMachineTickets").Model.findByIdAndDelete(incomingMachineTicketsCreated._id);;

      const jobStationQueueDeleted = await thisService.Model.findByIdAndDelete(jobStationQueueCreated._id);
      assert.strictEqual(jobStationQueueDeleted._id.toString(), jobStationQueueCreated._id.toString());
    });
  });
});