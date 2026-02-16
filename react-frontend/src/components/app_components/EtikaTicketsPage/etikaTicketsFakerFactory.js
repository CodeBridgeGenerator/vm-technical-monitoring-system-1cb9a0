
import { faker } from "@faker-js/faker";
export default (user,count,machineIdIds,etikaRequestorIds,assignedSupervisorIds,assignedTechnicianIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
machineId: machineIdIds[i % machineIdIds.length],
checklistResponse: faker.lorem.sentence(""),
etikaRequestor: etikaRequestorIds[i % etikaRequestorIds.length],
assignedSupervisor: assignedSupervisorIds[i % assignedSupervisorIds.length],
assignedTechnician: assignedTechnicianIds[i % assignedTechnicianIds.length],
status: faker.lorem.sentence(""),
startTime: faker.lorem.sentence(""),
endTime: faker.lorem.sentence(""),
supervisorStartTime: faker.lorem.sentence(""),
supervisorEndTime: faker.lorem.sentence(""),
technicianStartTime: faker.lorem.sentence(""),
technicianEndTime: faker.lorem.sentence(""),
comments: faker.lorem.sentence(""),
machineImage: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
