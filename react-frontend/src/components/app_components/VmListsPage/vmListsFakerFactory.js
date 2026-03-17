
import { faker } from "@faker-js/faker";
export default (user,count,vmCodeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
vmCode: vmCodeIds[i % vmCodeIds.length],
vmLocation: faker.lorem.sentence(""),
locationDescription: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
