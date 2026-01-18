
import { faker } from "@faker-js/faker";
export default (user,count,partIds,warehouseIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
part: partIds[i % partIds.length],
warehouse: warehouseIds[i % warehouseIds.length],
quantity: faker.datatype.number(""),
costAmount: faker.datatype.number(""),
reorderingQuantity: faker.datatype.number(""),
reorderingPoint: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
