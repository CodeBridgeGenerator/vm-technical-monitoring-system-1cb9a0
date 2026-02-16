
import { faker } from "@faker-js/faker";
export default (user,count,associatedNoIds,partIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
associatedNo: associatedNoIds[i % associatedNoIds.length],
part: partIds[i % partIds.length],
quantity: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
