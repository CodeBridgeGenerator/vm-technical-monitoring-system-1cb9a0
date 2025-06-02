
import { faker } from "@faker-js/faker";
export default (user,count,machineIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
machineId: machineIdIds[i % machineIdIds.length],
checklistResponse: faker.lorem.sentence(""),
assignedSupervisors: faker.lorem.sentence(""),
selectedJobStations: faker.lorem.sentence(""),
startTime: faker.lorem.sentence(""),
endTime: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
