
import { faker } from "@faker-js/faker";
export default (user,count,incomingMachineTicketIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
incomingMachineTicketId: incomingMachineTicketIdIds[i % incomingMachineTicketIdIds.length],
selectedJobStations: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
priority: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
