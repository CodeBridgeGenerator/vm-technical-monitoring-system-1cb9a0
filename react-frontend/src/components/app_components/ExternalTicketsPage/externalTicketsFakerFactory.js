
import { faker } from "@faker-js/faker";
export default (user,count,machineIdIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
machineId: machineIdIds[i % machineIdIds.length],
checklistResponse: faker.date.past(""),
assignedSupervisor: faker.date.past(""),
assignedTechnician: faker.date.past(""),
status: faker.date.past(""),
startTime: faker.date.past(""),
endTime: faker.date.past(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
