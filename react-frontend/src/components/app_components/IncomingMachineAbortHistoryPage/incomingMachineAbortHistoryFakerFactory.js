
import { faker } from "@faker-js/faker";
export default (user,count,ticketIdIds,abortedByIds,machineIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
ticketId: ticketIdIds[i % ticketIdIds.length],
abortedBy: abortedByIds[i % abortedByIds.length],
abortReason: faker.lorem.sentence(""),
abortedAt: faker.lorem.sentence(""),
machineId: machineIdIds[i % machineIdIds.length],
status: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
