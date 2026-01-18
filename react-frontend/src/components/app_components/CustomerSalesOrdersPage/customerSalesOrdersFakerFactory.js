
import { faker } from "@faker-js/faker";
export default (user,count,companyIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
company: companyIds[i % companyIds.length],
salesOrderId: faker.lorem.sentence(1),
salesOrderDate: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
