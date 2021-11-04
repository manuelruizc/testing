import faker from 'faker';
import moment from 'moment';
import delayResolve from 'kwivrr-common/delayResolve';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';

function createSplashPageData(id, loggedIn = false) {
    const {
        image: { avatar, business },
        name: { findName },
        company: { companyName },
        datatype: { boolean, number, uuid },
        lorem: { paragraphs, text },
        date: { soon, recent, future },
    } = faker;
    let dateFunc = [soon, recent, future];
    dateFunc = dateFunc[number({ min: 0, max: 2 })];
    const startAt = dateFunc();
    const eventDuration = number({ min: 35, max: 180 });
    const endAt = new Date(moment(dateFunc()).add(eventDuration, 'minutes'));
    const numberOfSpeakers = new Array(number({ min: 1, max: 4 })).fill(null);
    const isSoldOut = boolean();
    const obj = {
        hostAvatarUrl: avatar(), // pass this
        hostName: findName(), // pass this
        hostId: uuid(),
        // this is how it s called in the api calls
        coverUrl: business(), // pass this
        eventImage: business(), // pass this
        // this is how it s called in the api calls
        title: companyName(), // pass this
        eventName: companyName(), // pass this
        // this is how it s called in the api calls
        startAt: moment(startAt).format('MM/DD/YYYY, HH:mm A'),
        eventStartDatetime: moment(startAt).format('MM/DD/YYYY, HH:mm A'),
        endAt: moment(startAt).format('MM/DD/YYYY, HH:mm A'),
        description: paragraphs(),
        hasTickets: boolean(), // pass this ??????
        numTicketsOwned: !loggedIn ? 0 : number({ min: 0, max: 14 }), // pass this
        isSoldOut, // pass this
        eventId: uuid(),
        hasGeneralTicketsRemaining: isSoldOut ? false : boolean(),
        generalTicketPrice: number({ min: 4, max: 10, precision: 0.01 }),
        hasVIPTicketsRemaining: isSoldOut ? false : boolean(),
        VIPTicketPrice: number({ min: 25, max: 120, precision: 0.01 }),
        generalTicketDescription: paragraphs(),
        VIPTicketDescription: paragraphs(),
        isLive: boolean(), // pass this
        livePreviewImageUrl: business(),
        speakers: numberOfSpeakers.map((_, idx) => ({
            id: uuid(),
            avatarUrl: avatar(),
            name: findName(),
            topic: paragraphs(),
            description: paragraphs(),
            startAt: new Date(
                moment(startAt).add(
                    (eventDuration / numberOfSpeakers.length) * idx,
                    'minutes'
                )
            ),
            endAt: moment(startAt).add(
                (eventDuration / numberOfSpeakers.length) * (idx + 1),
                'minutes'
            ),
        })),
    };
    return obj;
}

export async function fetchSplashPageData() {
    return await delayResolve(createSplashPageData);
}

// Speaker object
// id (int)
// avatarUrl
// topic (string)
// description (string)
// startAt (datetime)
// endAt (datetime)
