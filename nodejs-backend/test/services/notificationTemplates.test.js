const assert = require("assert");
const app = require("../../src/app");

let usersRefData = [
  {
    name: "Standard User",
    email: "standard@example.com",
    password: "password",
  },
];

describe("notificationTemplates service", async () => {
  let thisService;
  let notificationTemplateCreated;
  let usersServiceResults;
  let users;

  

  beforeEach(async () => {
    thisService = await app.service("notificationTemplates");

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
    assert.ok(thisService, "Registered the service (notificationTemplates)");
  });

  describe("#create", () => {
    const options = {"name":"new value","title":"new value","body":"new value","image":"new value"};

    beforeEach(async () => {
      notificationTemplateCreated = await thisService.Model.create({...options, ...users});
    });

    it("should create a new notificationTemplate", () => {
      assert.strictEqual(notificationTemplateCreated.name, options.name);
assert.strictEqual(notificationTemplateCreated.title, options.title);
assert.strictEqual(notificationTemplateCreated.body, options.body);
assert.strictEqual(notificationTemplateCreated.image, options.image);
    });
  });

  describe("#get", () => {
    it("should retrieve a notificationTemplate by ID", async () => {
      const retrieved = await thisService.Model.findById(notificationTemplateCreated._id);
      assert.strictEqual(retrieved._id.toString(), notificationTemplateCreated._id.toString());
    });
  });

  describe("#update", () => {
    const options = {"name":"updated value","title":"updated value","body":"updated value","image":"updated value"};

    it("should update an existing notificationTemplate ", async () => {
      const notificationTemplateUpdated = await thisService.Model.findByIdAndUpdate(
        notificationTemplateCreated._id, 
        options, 
        { new: true } // Ensure it returns the updated doc
      );
      assert.strictEqual(notificationTemplateUpdated.name, options.name);
assert.strictEqual(notificationTemplateUpdated.title, options.title);
assert.strictEqual(notificationTemplateUpdated.body, options.body);
assert.strictEqual(notificationTemplateUpdated.image, options.image);
    });
  });

  describe("#delete", async () => {
    it("should delete a notificationTemplate", async () => {
      await app
        .service("users")
        .Model.findByIdAndDelete(usersServiceResults._id);

      ;

      const notificationTemplateDeleted = await thisService.Model.findByIdAndDelete(notificationTemplateCreated._id);
      assert.strictEqual(notificationTemplateDeleted._id.toString(), notificationTemplateCreated._id.toString());
    });
  });
});