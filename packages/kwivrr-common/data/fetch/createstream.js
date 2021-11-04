import faker from 'faker';
import moment from 'moment';

export const getRandomEventForClone = () => {
    const scheduledStartTime = faker.date.soon();
    const scheduledEndTime = new Date(
        moment(scheduledEndTime).add(48, 'minutes')
    );
    const publishDate = new Date(moment(scheduledStartTime).add(4, 'days'));
    const archiveDate = new Date(moment(scheduledStartTime).add(14, 'days'));
    const newEvent = {
        streamDetails: {
            streamTitle: faker.company.companyName(),
            provider: faker.datatype.boolean() ? 'youtube' : 'vimeo',
            streamEmbeddedCode: 'https://www.youtube.com/watch?v=w_Ma8oQLmSM',
            private: faker.datatype.boolean(),
            tickets: false,
        },
        marketing: {
            coverUrl: faker.image.nature(),
            description: faker.lorem.paragraph(),
            shopLink: 'https://www.kkwbeauty.com',
            languagesSupported: [''],
        },
        schedulingAndTicketing: {
            archiveDate: moment(archiveDate).format('MM/DD/YYYY, hh:mm A'),
            customTimeZone: faker.datatype.boolean(),
            eventCountdown: faker.datatype.boolean(),
            scheduledStartTime: moment(scheduledStartTime).format(
                'MM/DD/YYYY, hh:mm A'
            ),
            scheduledEndTime: moment(scheduledEndTime).format(
                'MM/DD/YYYY, hh:mm A'
            ),
            publishDate: moment(publishDate).format('MM/DD/YYYY, hh:mm A'),
            tickets: false,
        },
        speakers: {
            speakers: [],
        },
        surveys: [],
    };
    return newEvent;
};
