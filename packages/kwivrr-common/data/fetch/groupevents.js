import faker from 'faker';

export const createGroupEvents = () => {
    const hasGroups = faker.datatype.boolean();
    const numberOfGroups = hasGroups
        ? faker.datatype.number({ min: 1, max: 4 })
        : 0;
    const groups = [];
    for (let i = 0; i < numberOfGroups; i++) {
        const group = {
            id: faker.datatype.uuid(),
            title: faker.company.companyName(),
        };
        groups.push(group);
    }
    return { data: groups };
};
