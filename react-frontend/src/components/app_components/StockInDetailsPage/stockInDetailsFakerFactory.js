
import { faker } from "@faker-js/faker";
export default (user,count,warehouseIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
model: faker.lorem.sentence(""),
serialNo: faker.lorem.sentence(""),
partNo: faker.lorem.sentence(""),
pricing: faker.lorem.sentence(""),
quantity: faker.lorem.sentence(""),
purchaseDate: faker.lorem.sentence(""),
partDescription: faker.lorem.sentence(""),
poNumber: faker.lorem.sentence(""),
doNumber: faker.lorem.sentence(""),
category: faker.lorem.sentence(""),
unitOfMeasurement: faker.lorem.sentence(""),
conditionOfTerms: faker.lorem.sentence(""),
warehouse: warehouseIds[i % warehouseIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
