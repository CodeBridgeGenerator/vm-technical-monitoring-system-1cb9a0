
import { faker } from "@faker-js/faker";
export default (user,count,purchaseOrderIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
purchaseOrder: purchaseOrderIds[i % purchaseOrderIds.length],
deliveryOrderId: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
