
import { faker } from "@faker-js/faker";
export default (user,count,ownershipIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(1),
locataion: faker.lorem.sentence(1),
ownership: ownershipIds[i % ownershipIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
