
import { faker } from "@faker-js/faker";
export default (user,count,quotationIndexIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(""),
period: faker.lorem.sentence(""),
quotationIndex: quotationIndexIds[i % quotationIndexIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
