
import { faker } from "@faker-js/faker";
export default (user,count,technicianCheckListIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
technicianCheckListId: technicianCheckListIdIds[i % technicianCheckListIdIds.length],
name: faker.lorem.sentence(1),
description: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
