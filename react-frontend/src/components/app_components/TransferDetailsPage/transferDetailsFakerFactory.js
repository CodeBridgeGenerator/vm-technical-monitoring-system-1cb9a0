
import { faker } from "@faker-js/faker";
export default (user,count,sourceWarehouseIds,destinationWarehouseIds,partNumberIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
sourceWarehouse: sourceWarehouseIds[i % sourceWarehouseIds.length],
destinationWarehouse: destinationWarehouseIds[i % destinationWarehouseIds.length],
partNumber: partNumberIds[i % partNumberIds.length],
quantity: faker.lorem.sentence(1),
transferDate: faker.lorem.sentence(1),
transferStatus: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
