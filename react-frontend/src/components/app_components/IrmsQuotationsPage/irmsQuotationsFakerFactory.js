
import { faker } from "@faker-js/faker";
export default (user,count,salesOrderIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
salesOrder: salesOrderIds[i % salesOrderIds.length],
validDate: faker.lorem.sentence(1),
quotationIndex: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
