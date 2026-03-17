const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("jobStations service", async () => {
  let thisService;
  let jobStationCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("jobStations");

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
    assert.ok(thisService, "Registered the service (jobStations)");
  });

  describe("#create", () => {
    const options = {"name":"new value","description":"new value"};

    beforeEach(async () => {
      jobStationCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new jobStation", () => {
      assert.strictEqual(jobStationCreated.name, options.name);
assert.strictEqual(jobStationCreated.description, options.description);
    });
  });

  describe("#get", () => {
    it("should retrieve a jobStation by ID", async () => {
      const retrieved = await thisService.Model.findById(jobStationCreated._id);
      assert.strictEqual(retrieved._id.toString(), jobStationCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","description":"updated value"};

    it("should update an existing jobStation ", async () => {
      const jobStationUpdated = await thisService.Model.findByIdAndUpdate(
        jobStationCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(jobStationUpdated.name, options.name);
assert.strictEqual(jobStationUpdated.description, options.description);
    });
  });

  describe("#delete", async () => {
    it("should delete a jobStation", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const jobStationDeleted = await thisService.Model.findByIdAndDelete(jobStationCreated._id);
      assert.strictEqual(jobStationDeleted._id.toString(), jobStationCreated._id.toString());
    });
  });
});