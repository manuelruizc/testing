import faker from 'faker';
import { userTypes } from '../types/users';

const userAccountType = [
    userTypes.Attendee,
    userTypes.Host,
    userTypes.EventManager,
    userTypes.Admin,
    userTypes.CorporateAdmin,
    userTypes.SuperAdmin,
];

const accounts = [
    {
        email: 'meganhendricks@gmail.com',
        userInfo: {
            id: faker.datatype.uuid(),
            email: 'meganhendricks@gmail.com',
            fullName: 'Megan Hendricks',
            firstName: 'Megan',
            lastName: 'Hendricks',
            tagline: 'Can you hear me now? Good.',
            coverUrl: faker.image.nature(),
            phone: '7358424389',
            shopLink: 'https://www.kkw.com',
            facebookId: 'facebook.com/meganhendricks',
            instagramId: 'instagram.com/meganhendricks',
            twitterId: 'twitter.com/meganhendricks',
            youtubeId: 'youtube.com/meganhendricks',
            linkedinId: 'linkedin.com/meganhendricks',
            avatar: 'https://images.unsplash.com/photo-1594369428909-cf575675ca9a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80',
            userType:
                userAccountType[
                    faker.datatype.number({
                        min: 0,
                        max: userAccountType.length - 1,
                    })
                ],
        },
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlckVtYWlsIjoiaWNlbnRyaXNAdGVzdC5jb20iLCJ1c2VyTmFtZSI6IkpvaG4gV2F5bmUiLCJhdmF0YXIiOiJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zLzcvN2IvSm9obl9XYXluZV8tX3N0aWxsX3BvcnRyYWl0LmpwZyIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.nLIG3Qm7VhyjFbEbs109ECrx9q5glpAocCfH_fTknGw',
    },
    {
        email: 'thompson14@gmail.com',
        userInfo: {
            id: faker.datatype.uuid(),
            email: 'thompson14@gmail.com',
            fullName: 'John Thompson',
            firstName: 'John',
            lastName: 'Thompson',
            tagline: '',
            coverUrl: faker.image.nature(),
            phone: '7358424389',
            shopLink: 'https://www.kkw.com',
            facebookId: 'facebook.com/meganhendricks',
            instagramId: 'instagram.com/meganhendricks',
            twitterId: 'twitter.com/meganhendricks',
            youtubeId: 'youtube.com/meganhendricks',
            linkedinId: 'linkedin.com/meganhendricks',
            avatar: 'https://images.unsplash.com/photo-1591084728795-1149f32d9866?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
            userType:
                userAccountType[
                    faker.datatype.number({
                        min: 0,
                        max: userAccountType.length - 1,
                    })
                ],
        },
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlckVtYWlsIjoiaWNlbnRyaXNAdGVzdC5jb20iLCJ1c2VyTmFtZSI6IkpvaG4gV2F5bmUiLCJhdmF0YXIiOiJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zLzcvN2IvSm9obl9XYXluZV8tX3N0aWxsX3BvcnRyYWl0LmpwZyIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.nLIG3Qm7VhyjFbEbs109ECrx9q5glpAocCfH_fTknGw',
    },
    {
        email: 'easton.rutkoski@icentris.com',
        userInfo: {
            id: faker.datatype.uuid(),
            email: 'easton.rutkoski@icentris.com',
            fullName: 'Easton Rutkoski',
            firstName: 'Easton',
            lastName: 'Rutkoski',
            tagline: '',
            coverUrl: faker.image.nature(),
            phone: '8012053510',
            shopLink: 'https://www.applestore.com',
            facebookId: 'https://www.facebook.com/apple',
            instagramId: 'https://www.instagram.com/apple',
            twitterId: 'https://www.twitter.com/apple',
            youtubeId: 'https://www.youtube.com/apple',
            linkedinId: 'https://www.linkedin.com/company/apple',
            avatar: 'https://i.imgur.com/uZXYHJe.png',
            userType:
                userAccountType[
                    faker.datatype.number({
                        min: 0,
                        max: userAccountType.length - 1,
                    })
                ],
        },
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlckVtYWlsIjoiaWNlbnRyaXNAdGVzdC5jb20iLCJ1c2VyTmFtZSI6IkpvaG4gV2F5bmUiLCJhdmF0YXIiOiJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zLzcvN2IvSm9obl9XYXluZV8tX3N0aWxsX3BvcnRyYWl0LmpwZyIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.nLIG3Qm7VhyjFbEbs109ECrx9q5glpAocCfH_fTknGw',
    },
    {
        email: 'evelyn.johnson@icentris.com',
        userInfo: {
            id: faker.datatype.uuid(),
            email: 'evelyn.johnson@icentris.com',
            fullName: 'Evelyn Johnson',
            firstName: 'Evelyn',
            lastName: 'Johnson',
            tagline: '',
            coverUrl: faker.image.nature(),
            phone: '8012053510',
            shopLink: 'https://www.amazon.com',
            facebookId: 'https://www.facebook.com/amazon',
            instagramId: 'https://www.instagram.com/amazon',
            twitterId: 'https://www.twitter.com/amazon',
            youtubeId: 'https://www.youtube.com/amazon',
            linkedinId: 'https://www.linkedin.com/company/amazon',
            avatar: 'https://i.imgur.com/LNGzift.jpg',
            userType:
                userAccountType[
                    faker.datatype.number({
                        min: 0,
                        max: userAccountType.length - 1,
                    })
                ],
        },
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwidXNlckVtYWlsIjoiaWNlbnRyaXNAdGVzdC5jb20iLCJ1c2VyTmFtZSI6IkpvaG4gV2F5bmUiLCJhdmF0YXIiOiJodHRwczovL3VwbG9hZC53aWtpbWVkaWEub3JnL3dpa2lwZWRpYS9jb21tb25zLzcvN2IvSm9obl9XYXluZV8tX3N0aWxsX3BvcnRyYWl0LmpwZyIsIm5hbWUiOiJKb2huIERvZSIsImlhdCI6MTUxNjIzOTAyMn0.nLIG3Qm7VhyjFbEbs109ECrx9q5glpAocCfH_fTknGw',
    },
];

export const getUserLoginInfo = (userEmail) => {
    const userData = accounts.find((account) => account.email === userEmail);
    return userData;
};
