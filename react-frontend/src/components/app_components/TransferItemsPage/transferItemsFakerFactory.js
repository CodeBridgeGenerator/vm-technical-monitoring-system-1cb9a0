
import { faker } from "@faker-js/faker";
export default (user,count,transferDateIds,partIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
transferDate: transferDateIds[i % transferDateIds.length],
part: partIds[i % partIds.length],
quantity: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
