import faker from 'faker';

export const getFeaturedItems = () => {
    const items = faker.datatype.number({ min: 5, max: 10 });
    const featuredItems = [];
    for (let i = 0; i < items; i++) {
        const item = {
            id: String(faker.datatype.number({ min: 1, max: 1242 })),
            type: 'featured_item',
            attributes: {
                name: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                url: 'https://www.amazon.com',
                sortingWeight: 0,
                imageUrl: faker.image.fashion(),
                // need to add this
                price: faker.commerce.price(),
            },
        };
        featuredItems.push(item);
    }
    return featuredItems;
};
