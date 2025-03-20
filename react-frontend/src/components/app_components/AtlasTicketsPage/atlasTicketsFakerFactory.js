
import { faker } from "@faker-js/faker";
export default (user,count,machineIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
machineId: machineIdIds[i % machineIdIds.length],
checklistResponse: faker.lorem.sentence(1),
assignedSupervisor: faker.lorem.sentence(1),
assignedTechnician: faker.lorem.sentence(1),
status: faker.lorem.sentence(1),
startTime: faker.lorem.sentence(1),
endTime: faker.lorem.sentence(1),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
