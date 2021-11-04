import delayResolve from 'kwivrr-common/delayResolve';

export const userProfileInfo = {
    id: '5274',
    type: 'profile',
    attributes: {
        userId: 5277,
        title: 'Programmer',
        firstname: 'Jon',
        lastname: 'Cain',
        tagline: null,
        facebook: 'https://www.facebook.com/facebook',
        instagram: 'https://www.instagram.com/instagram',
        pinterest: null,
        blogger: null,
        linkedin: null,
        twitter: 'https://www.twitter.com/twitter',
        shopLink: 'https://ebay.com',
        emailVisibility: true,
        phoneVisibility: true,
        avatarUrl:
            'https://zevents.dev.vibeoffice.com/api/v1/users/5277/avatar_url',
        bannerUrl:
            'https://zevents.dev.vibeoffice.com/api/v1/users/5277/banner_url',
        email: 'jon.cain@icentris.com',
        phone: '123 123 123123',
    },
    relationships: {
        user: {
            data: {
                id: '5277',
                type: 'user',
            },
        },
    },
};

export async function fetchHostTickets() {
    return delayResolve(createHostTickets);
}
