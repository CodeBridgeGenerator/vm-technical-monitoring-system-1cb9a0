
import { faker } from "@faker-js/faker";
export default (user,count,partNameIds,jobIdIds,TechnicianIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
partName: partNameIds[i % partNameIds.length],
quantity: faker.date.past(""),
status: faker.date.past(""),
comment: faker.date.past(""),
requestedDate: faker.date.past(""),
jobId: jobIdIds[i % jobIdIds.length],
Technician: TechnicianIds[i % TechnicianIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
