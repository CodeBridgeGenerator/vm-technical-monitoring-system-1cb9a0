
import { faker } from "@faker-js/faker";
export default (user,count,atlasCheckListIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
atlasCheckListId: atlasCheckListIdIds[i % atlasCheckListIdIds.length],
name: faker.lorem.sentence(""),
description: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
