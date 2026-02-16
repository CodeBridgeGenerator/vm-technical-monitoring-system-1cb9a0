
import { faker } from "@faker-js/faker";
export default (user,count,ownershipIds,vendingMachineTypeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
ownership: ownershipIds[i % ownershipIds.length],
vendingMachineCode: faker.lorem.sentence(""),
modelNo: faker.lorem.sentence(""),
serialNumber: faker.lorem.sentence(""),
vendingMachineType: vendingMachineTypeIds[i % vendingMachineTypeIds.length],
comissionDate: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
