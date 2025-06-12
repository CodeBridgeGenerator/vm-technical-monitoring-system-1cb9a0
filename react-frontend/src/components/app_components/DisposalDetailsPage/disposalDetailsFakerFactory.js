
import { faker } from "@faker-js/faker";
export default (user,count,sourceWarehouseIds,partNumberIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
sourceWarehouse: sourceWarehouseIds[i % sourceWarehouseIds.length],
partNumber: partNumberIds[i % partNumberIds.length],
quantity: faker.date.past(""),
associatedNumber: faker.date.past(""),
affectiveDate: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
