const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("workflowServices service", async () => {
  let thisService;
  let workflowServiceCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("workflowServices");

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
    assert.ok(thisService, "Registered the service (workflowServices)");
  });

  describe("#create", () => {
    const options = {"queueName":"new value","type":"new value","data":"new value","status":"new value","jobId":"new value","attemptsMade":23,"error":"new value"};

    beforeEach(async () => {
      workflowServiceCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new workflowService", () => {
      assert.strictEqual(workflowServiceCreated.queueName, options.queueName);
assert.strictEqual(workflowServiceCreated.type, options.type);
assert.strictEqual(workflowServiceCreated.data, options.data);
assert.strictEqual(workflowServiceCreated.status, options.status);
assert.strictEqual(workflowServiceCreated.jobId, options.jobId);
assert.strictEqual(workflowServiceCreated.attemptsMade, options.attemptsMade);
assert.strictEqual(workflowServiceCreated.error, options.error);
    });
  });

  describe("#get", () => {
    it("should retrieve a workflowService by ID", async () => {
      const retrieved = await thisService.Model.findById(workflowServiceCreated._id);
      assert.strictEqual(retrieved._id.toString(), workflowServiceCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"queueName":"updated value","type":"updated value","data":"updated value","status":"updated value","jobId":"updated value","attemptsMade":100,"error":"updated value"};

    it("should update an existing workflowService ", async () => {
      const workflowServiceUpdated = await thisService.Model.findByIdAndUpdate(
        workflowServiceCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(workflowServiceUpdated.queueName, options.queueName);
assert.strictEqual(workflowServiceUpdated.type, options.type);
assert.strictEqual(workflowServiceUpdated.data, options.data);
assert.strictEqual(workflowServiceUpdated.status, options.status);
assert.strictEqual(workflowServiceUpdated.jobId, options.jobId);
assert.strictEqual(workflowServiceUpdated.attemptsMade, options.attemptsMade);
assert.strictEqual(workflowServiceUpdated.error, options.error);
    });
  });

  describe("#delete", async () => {
    it("should delete a workflowService", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const workflowServiceDeleted = await thisService.Model.findByIdAndDelete(workflowServiceCreated._id);
      assert.strictEqual(workflowServiceDeleted._id.toString(), workflowServiceCreated._id.toString());
    });
  });
});