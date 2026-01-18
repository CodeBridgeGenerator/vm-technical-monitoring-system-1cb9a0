
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
customerNo: faker.lorem.sentence(""),
name: faker.lorem.sentence(""),
phoneNo: faker.lorem.sentence(""),
agentName: faker.lorem.sentence(""),
address: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
