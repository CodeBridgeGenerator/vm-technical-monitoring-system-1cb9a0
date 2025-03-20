
import { faker } from "@faker-js/faker";
export default (user,count,ownershipIds,vmTypeIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
ownership: ownershipIds[i % ownershipIds.length],
vmCode: faker.date.past(""),
modelNo: faker.date.past(""),
serialNo: faker.date.past(""),
vmType: vmTypeIds[i % vmTypeIds.length],
commissionDate: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
