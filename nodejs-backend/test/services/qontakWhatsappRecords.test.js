const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("qontakWhatsappRecords service", async () => {
  let thisService;
  let qontakWhatsappRecordCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("qontakWhatsappRecords");

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
    assert.ok(thisService, "Registered the service (qontakWhatsappRecords)");
  });

  describe("#create", () => {
    const options = {"channelRoomId":"new value","qrText":"new value","extractedMachineId":"new value","vmCode":"new value","accountUniqueId":"new value","customerPhoneNo":"new value","refNo":"new value","status":"new value","landingUrl":"new value","source":"new value"};

    beforeEach(async () => {
      qontakWhatsappRecordCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new qontakWhatsappRecord", () => {
      assert.strictEqual(qontakWhatsappRecordCreated.channelRoomId, options.channelRoomId);
assert.strictEqual(qontakWhatsappRecordCreated.qrText, options.qrText);
assert.strictEqual(qontakWhatsappRecordCreated.extractedMachineId, options.extractedMachineId);
assert.strictEqual(qontakWhatsappRecordCreated.vmCode, options.vmCode);
assert.strictEqual(qontakWhatsappRecordCreated.accountUniqueId, options.accountUniqueId);
assert.strictEqual(qontakWhatsappRecordCreated.customerPhoneNo, options.customerPhoneNo);
assert.strictEqual(qontakWhatsappRecordCreated.refNo, options.refNo);
assert.strictEqual(qontakWhatsappRecordCreated.status, options.status);
assert.strictEqual(qontakWhatsappRecordCreated.landingUrl, options.landingUrl);
assert.strictEqual(qontakWhatsappRecordCreated.source, options.source);
    });
  });

  describe("#get", () => {
    it("should retrieve a qontakWhatsappRecord by ID", async () => {
      const retrieved = await thisService.Model.findById(qontakWhatsappRecordCreated._id);
      assert.strictEqual(retrieved._id.toString(), qontakWhatsappRecordCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"channelRoomId":"updated value","qrText":"updated value","extractedMachineId":"updated value","vmCode":"updated value","accountUniqueId":"updated value","customerPhoneNo":"updated value","refNo":"updated value","status":"updated value","landingUrl":"updated value","source":"updated value"};

    it("should update an existing qontakWhatsappRecord ", async () => {
      const qontakWhatsappRecordUpdated = await thisService.Model.findByIdAndUpdate(
        qontakWhatsappRecordCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(qontakWhatsappRecordUpdated.channelRoomId, options.channelRoomId);
assert.strictEqual(qontakWhatsappRecordUpdated.qrText, options.qrText);
assert.strictEqual(qontakWhatsappRecordUpdated.extractedMachineId, options.extractedMachineId);
assert.strictEqual(qontakWhatsappRecordUpdated.vmCode, options.vmCode);
assert.strictEqual(qontakWhatsappRecordUpdated.accountUniqueId, options.accountUniqueId);
assert.strictEqual(qontakWhatsappRecordUpdated.customerPhoneNo, options.customerPhoneNo);
assert.strictEqual(qontakWhatsappRecordUpdated.refNo, options.refNo);
assert.strictEqual(qontakWhatsappRecordUpdated.status, options.status);
assert.strictEqual(qontakWhatsappRecordUpdated.landingUrl, options.landingUrl);
assert.strictEqual(qontakWhatsappRecordUpdated.source, options.source);
    });
  });

  describe("#delete", async () => {
    it("should delete a qontakWhatsappRecord", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const qontakWhatsappRecordDeleted = await thisService.Model.findByIdAndDelete(qontakWhatsappRecordCreated._id);
      assert.strictEqual(qontakWhatsappRecordDeleted._id.toString(), qontakWhatsappRecordCreated._id.toString());
    });
  });
});