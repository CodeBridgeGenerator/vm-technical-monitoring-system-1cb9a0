
import { faker } from "@faker-js/faker";
export default (user,count,vmCodeIds,warehouseIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
vmCode: vmCodeIds[i % vmCodeIds.length],
pricing: faker.lorem.sentence(1),
quantity: faker.lorem.sentence(1),
purchaseDate: faker.lorem.sentence(1),
partDescription: faker.lorem.sentence(1),
poNumber: faker.lorem.sentence(1),
doNumber: faker.lorem.sentence(1),
category: faker.lorem.sentence(1),
unitOfMeasurement: faker.lorem.sentence(1),
conditionOfTerms: faker.lorem.sentence(1),
warehouse: warehouseIds[i % warehouseIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
