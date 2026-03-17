
import { faker } from "@faker-js/faker";
export default (user,count,quotationIds,incomingMachineTicketIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
quotation: quotationIds[i % quotationIds.length],
incomingMachineTicket: incomingMachineTicketIds[i % incomingMachineTicketIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
