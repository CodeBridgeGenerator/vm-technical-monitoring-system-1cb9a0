
import { faker } from "@faker-js/faker";
export default (user,count,sourceWarehouseIds,destinationWarehouseIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
sourceWarehouse: sourceWarehouseIds[i % sourceWarehouseIds.length],
destinationWarehouse: destinationWarehouseIds[i % destinationWarehouseIds.length],
transferDate: faker.lorem.sentence(""),
transferStatus: faker.lorem.sentence(""),
deliveryAddress: faker.lorem.sentence(""),
transferDocuments: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
