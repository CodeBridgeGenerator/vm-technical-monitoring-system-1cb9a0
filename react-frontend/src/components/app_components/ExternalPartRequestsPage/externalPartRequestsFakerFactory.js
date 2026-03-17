
import { faker } from "@faker-js/faker";
export default (user,count,partNameIds,externalTicketIds,technicianIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
partName: partNameIds[i % partNameIds.length],
quantity: faker.date.past(""),
status: faker.date.past(""),
comment: faker.date.past(""),
requestedDate: faker.date.past(""),
externalTicket: externalTicketIds[i % externalTicketIds.length],
technician: technicianIds[i % technicianIds.length],
approvedDate: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
