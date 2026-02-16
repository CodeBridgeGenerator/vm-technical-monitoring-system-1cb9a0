
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
queueName: faker.lorem.sentence(""),
type: faker.lorem.sentence(""),
data: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
jobId: faker.lorem.sentence(""),
attemptsMade: faker.lorem.sentence(""),
error: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
