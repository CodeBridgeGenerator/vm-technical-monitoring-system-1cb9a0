
import { faker } from "@faker-js/faker";
export default (user,count,ownershipIds,vendingMachineTypeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
ownership: ownershipIds[i % ownershipIds.length],
vendingMachineCode: faker.date.past(""),
modelNo: faker.date.past(""),
serialNumber: faker.date.past(""),
vendingMachineType: vendingMachineTypeIds[i % vendingMachineTypeIds.length],
commissionDate: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
