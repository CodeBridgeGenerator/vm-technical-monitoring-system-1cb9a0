
import { faker } from "@faker-js/faker";
export default (user,count,quotationIndexIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
quotationIndex: quotationIndexIds[i % quotationIndexIds.length],
description: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
