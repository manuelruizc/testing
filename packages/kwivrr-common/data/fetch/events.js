import faker from 'faker';
import moment from 'moment';
import delayResolve from 'kwivrr-common/delayResolve';

const userEvents = () => {
    const { datatype, date, company, image, name } = faker;
    const { number, boolean, uuid } = datatype;
    const { future, past, recent, soon } = date;
    const eventStartDateTimeArr = [future, past, recent, soon];
    const numberOfEvents = number({ min: 8, max: 22 });
    const response = [];
    for (let i = 0; i < numberOfEvents; i++) {
        const eventStartDateTimeArrIdx = number({ min: 0, max: 3 });
        const dateFunc = eventStartDateTimeArr[eventStartDateTimeArrIdx];
        const isHost = boolean();
        const attendant = isHost
            ? number({ min: 1, max: 400 })
            : number({ min: 1, max: 16 });
        const gaPrice = number({ min: 4, max: 12, precision: 0.01 });
        const gaTicketsSold = isHost
            ? number({ min: 1, max: 200 })
            : number({ min: 1, max: 12 });
        const vipPrice = number({ min: 20, max: 300, precision: 0.01 });
        const vipTicketsSold = isHost
            ? number({ min: 1, max: 100 })
            : number({ min: 1, max: 12 });
        const obj = {
            avatar: image.people(),
            id: uuid(),
            eventName: company.companyName(),
            eventStartDatetime: moment(dateFunc()).format(
                'MM/DD/YYYY, hh:mm A'
            ),
            // eventStartDatetime: '2021/04/18, 1:00 PM',
            eventImage: image.business(),
            streamFinished: boolean(),
            isHost,
            hostName: isHost ? 'Myself' : name.findName(),
            attendant,
            gaTicketsSold,
            gaTicketsPrice: parseFloat(gaPrice).toFixed(2),
            vipTicketsSold,
            vipTicketsPrice: parseFloat(vipPrice).toFixed(2),
            grossSales: parseFloat(
                gaTicketsSold * Number(gaPrice) +
                    vipTicketsSold * Number(vipPrice)
            ).toFixed(2),
        };
        response.push(obj);
    }
    return response;
};

export const createUpcomingEvents = () => {
    const response = new Array(8).fill(null).map((_, idx) => {
        const isSoldOut = faker.datatype.boolean();
        const momentStartDate = moment(faker.date.soon());

        const startDate = new Date();
        const id = faker.datatype.number({ min: 843, max: 3023 });
        const a = {
            id: String(id),
            type: 'event',
            attributes: {
                id,
                name: faker.company.companyName(),
                location: null,
                startDate: '2021-08-22T12:14:05.000-05:00',
                endDate: '2021-08-23T12:14:28.000-05:00',
                embedCode: null,
                state: 'v2',
                userId: faker.datatype.number({ min: 123, max: 12312 }),
                tenantId: 1,
                liveStreamName: null,
                broadcasted: false,
                livestreamType: null,
                shopUrl: null,
                learnmoreUrl: null,
                eventType: null,
                shareLink: null,
                eventImageUrl: faker.image.business(),
                // need to add this// need this one
                isSoldOut: faker.datatype.boolean(),
                userTickets: faker.datatype.boolean()
                    ? faker.datatype.number({ min: 1, max: 12 })
                    : 0,
                isLive: faker.datatype.boolean(),
                hostName: faker.name.findName(),
                hostAvatar: faker.image.avatar(),
                hasWaitList: faker.datatype.boolean(),
            },
            relationships: {
                host: {
                    data: {
                        id: '5294',
                        type: 'user',
                    },
                },
                provider: {
                    data: null,
                },
                event_groups: {
                    data: [],
                },
            },
        };
        return a;
        // return {
        //     avatar: faker.image.people(),
        //     eventImage: faker.image.nightlife(),
        //     eventName: faker.company.companyName(),
        //     eventStartDatetime: moment(faker.date.future()).format(
        //         'MM/DD/YYYY, HH:mm A'
        //     ),
        //     isLive: faker.datatype.boolean(),
        //     pillStatus: faker.datatype.boolean(),
        //     isSoldOut,
        //     tickets: faker.datatype.number({ min: 0, max: 12 }),
        //     isHost: false,
        //     hostName: false ? 'Myself' : faker.name.findName(),
        // };
    });
    return response;
};

export async function fetchUserEvents() {
    return delayResolve(userEvents);
}
