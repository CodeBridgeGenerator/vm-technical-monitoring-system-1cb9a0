
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
channelRoomId: faker.lorem.sentence(""),
qrText: faker.lorem.sentence(""),
extractedMachineId: faker.lorem.sentence(""),
vmCode: faker.lorem.sentence(""),
accountUniqueId: faker.lorem.sentence(""),
customerPhoneNo: faker.lorem.sentence(""),
refNo: faker.lorem.sentence(""),
status: faker.lorem.sentence(""),
landingUrl: faker.lorem.sentence(""),
source: faker.lorem.sentence(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
