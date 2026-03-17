
import { faker } from "@faker-js/faker";
export default (user,count,partNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
partName: partNameIds[i % partNameIds.length],
stockOutType: faker.lorem.sentence(1),
associatedOrderNumber: faker.lorem.sentence(1),
conditionOfItems: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
