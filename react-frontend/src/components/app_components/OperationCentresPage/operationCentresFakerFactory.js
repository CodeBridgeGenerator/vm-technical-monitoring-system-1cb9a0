
import { faker } from "@faker-js/faker";
export default (user,count,codeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.lorem.sentence(1),
code: codeIds[i % codeIds.length],
description: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
