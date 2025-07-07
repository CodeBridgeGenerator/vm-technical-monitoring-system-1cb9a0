
import { faker } from "@faker-js/faker";
export default (user,count) => {
    let data = [];
    for (let i = 0; i < count; i++) {
        const fake = {
serialNo: faker.datatype.number(""),
itemNo: faker.datatype.number(""),
description: faker.datatype.number(""),
quantity: faker.datatype.number(""),
costAmount: faker.datatype.number(""),

updatedBy: user._id,
createdBy: user._id
        };
        data = [...data, fake];
    }
    return data;
};
