
import { faker } from "@faker-js/faker";
export default (user,count,sourceWarehouseIds,partNumberIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
sourceWarehouse: sourceWarehouseIds[i % sourceWarehouseIds.length],
partNumber: partNumberIds[i % partNumberIds.length],
quantity: faker.lorem.sentence(1),
associatedNumber: faker.lorem.sentence(1),
affectiveDate: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
