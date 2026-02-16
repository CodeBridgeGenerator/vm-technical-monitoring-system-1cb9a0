
import { faker } from "@faker-js/faker";
export default (user,count,deliveryOrdersIds,partIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
deliveryOrders: deliveryOrdersIds[i % deliveryOrdersIds.length],
part: partIds[i % partIds.length],
quantity: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
