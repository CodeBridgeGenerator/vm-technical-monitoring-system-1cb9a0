
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(1),
code: faker.lorem.sentence(1),
type: faker.lorem.sentence(1),
area: faker.lorem.sentence(1),
description: faker.lorem.sentence(1),
supervisor: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
