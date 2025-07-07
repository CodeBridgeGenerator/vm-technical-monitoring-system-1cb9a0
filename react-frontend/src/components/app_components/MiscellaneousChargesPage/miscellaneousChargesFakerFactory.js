
import { faker } from "@faker-js/faker";
export default (user,count,quotationNoIds) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
name: faker.datatype.number(""),
description: faker.datatype.number(""),
amount: faker.datatype.number(""),
quotationNo: quotationNoIds[i % quotationNoIds.length],

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
