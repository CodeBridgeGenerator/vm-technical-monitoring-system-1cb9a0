
import { faker } from "@faker-js/faker";
export default (user,count,quotationIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
quotation: quotationIds[i % quotationIds.length],
purchaseOrderDate: faker.lorem.sentence(1),
deliveryDate: faker.lorem.sentence(1),
purchaseOrderId: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
