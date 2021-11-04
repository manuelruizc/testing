import moment from 'moment';
import { defaultDateFormat } from 'kwivrr-common/dateFormats';

export const cardPressableOptions = {
    allCardIsPressable: false,
    imagePressable: true,
    streamTitlePressable: true,
};

export const toCalendarFormattedDate = (date) => {
    return defaultDateFormat(date);
};

// export const toCalendarFormattedDate = (date) => {
//     const _date = date.substr(0, 10).split('/');
//     let temp = _date[0];
//     _date[0] = _date[2];
//     _date[2] = temp;
//     temp = _date[1];
//     _date[1] = _date[2];
//     _date[2] = temp;
//     return _date.join('-');
// };

export const getUpcomingStreams = (data) => {
    if (!data) return null;
    const ownStreams = data.filter(
        (event) => event.isHost && !event.streamFinished
    );
    if (!ownStreams.length) return null;
    return ownStreams;
};

export const getCompletedStreams = (data) => {
    if (!data) return null;
    const ownStreams = data.filter(
        (event) => event.isHost && event.streamFinished
    );
    if (!ownStreams.length) return null;
    return ownStreams;
};

export const getRegisteredEvents = (data) => {
    if (!data) return null;
    const registeredEvents = data.filter(
        (event) => !event.isHost && !event.streamFinished
    );
    if (!registeredEvents.length) return null;
    return registeredEvents;
};

export const getAttendedEvents = (data) => {
    if (!data) return null;
    const attendedEvents = data.filter(
        (event) => !event.isHost && event.streamFinished
    );
    if (!attendedEvents.length) return null;
    return attendedEvents;
};

// these are using for calendar view
export const getMarkedDates = (data) => {
    if (!data) return null;
    const obj = {};
    data.forEach((day) => {
        obj[day.date] = { selected: true };
    });
    return obj;
};
// export const getMarkedDates = (data) => {
//     if (!data) return null;
//     const obj = {};
//     data.forEach((event) => {
//         const dateKey = toCalendarFormattedDate(event.eventStartDatetime);
//         obj[dateKey] = { selected: true };
//     });
//     return obj;
// };

export const getDaySelectedInfo = (data) => {
    if (!data) return null;
    const dayInfo = data.filter(
        (event) =>
            event.eventStartDatetime.substr(0, 10).split('/').join('-') ===
            moment(daySelected).format('MM-DD-YYYY')
    );
    if (!dayInfo.length) return null;
    return dayInfo;
};

export const calendarGetUpcomingStreams = (data, day) => {
    if (!data) return null;
    if (!day) return null;
    const ownStreams = day.filter(
        (event) => event.isHost && !event.streamFinished
    );
    if (!ownStreams.length) return null;
    return ownStreams;
};

export const calendarGetCompletedStreams = (data, day) => {
    if (!data) return null;
    if (!day) return null;
    const ownStreams = day.filter(
        (event) => event.isHost && event.streamFinished
    );
    if (!ownStreams.length) return null;
    return ownStreams;
};

export const calendarGetRegisteredEvents = (data, day) => {
    if (!data) return null;
    if (!day) return null;
    const ownStreams = day.filter(
        (event) => !event.isHost && !event.streamFinished
    );
    if (!ownStreams.length) return null;
    return ownStreams;
};

export const calendarGetAttendedEvents = (data, day) => {
    if (!data) return null;
    if (!day) return null;
    const ownStreams = day.filter(
        (event) => !event.isHost && event.streamFinished
    );
    if (!ownStreams.length) return null;
    return ownStreams;
};
