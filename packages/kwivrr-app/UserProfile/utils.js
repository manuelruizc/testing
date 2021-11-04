import faker from 'faker';
import moment from 'moment';

export const generateEvents = (loggedIn) => {
    const events = [0,0,0,0,0,0,0].map((item, index) => {
        const { image, datatype, name, date } = faker;
        const { title } = name;
        const { business } = image;
        const { boolean, number } = datatype;
        const { soon } = date;
        return {
            eventName: title(),
            eventStartDatetime: moment(soon()).format('MMMM DD, YYYY'),
            eventImage: business(),
            isLive: boolean(),
            isSoldOut: boolean(),
            pillStatus: !loggedIn ? false : boolean(),
            tickets: number({min: 0, max: 1})
        };
    });
    return events;
}