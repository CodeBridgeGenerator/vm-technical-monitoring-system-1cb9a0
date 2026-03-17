
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
ownership: faker.lorem.sentence(1),
vendingMachineCode: faker.lorem.sentence(1),
modelNo: faker.lorem.sentence(1),
serialNo: faker.lorem.sentence(1),
commissionDate: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
