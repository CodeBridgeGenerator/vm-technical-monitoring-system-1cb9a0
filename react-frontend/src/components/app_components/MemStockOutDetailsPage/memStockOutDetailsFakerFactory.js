
import { faker } from "@faker-js/faker";
export default (user,count,partNameIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
partName: partNameIds[i % partNameIds.length],
quantity: faker.lorem.sentence(1),
stockOutType: faker.lorem.sentence(1),
associatedOrderNumber: faker.lorem.sentence(1),
conditionOfItems: faker.lorem.sentence(1),
stockOutDate: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
