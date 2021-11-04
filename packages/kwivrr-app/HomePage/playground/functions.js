import React from 'react';
import _ from 'lodash';
import faker from 'faker';
import moment from 'moment';
import {
    eventImages,
    loggedInEvents,
    loggedOutEvents,
    randomDate,
} from './data';
import { AUTH_STATE } from 'kwivrr-common/AuthContext';
const randomNumber = () => Math.floor(Math.random() * 3) + 1 - 1;

export const fetchEvents = (authState) => {
    const index = randomNumber();
    const arrayToFetch =
        authState === AUTH_STATE.LOGGED_IN ? loggedInEvents : loggedOutEvents;
    const shuffledArray = _.shuffle(arrayToFetch);
    const { image, datatype, name, company } = faker;
    let isSoldOut = false;
    let dateData = randomDate();
    shuffledArray.unshift({
        id: datatype.uuid(),
        userId: datatype.uuid(),
        hostName: name.findName(),
        avatar: image.avatar(),
        isSoldOut,
        eventImage: eventImages[datatype.number({ min: 0, max: 24 })],
        eventName: company.companyName(),
        bookable: !isSoldOut,
        ticketsAvailable: 4,
        time: dateData.date.getTime(),
        // date: dateData.date,
        eventStartDatetime: moment(dateData.date).format('MM/DD/YYYY, hh:mm A'),
        // eventStartDatetime: '04/08/2021, 11:00 AM',
        isLive: true,
        isHost: authState ? false : datatype.boolean(),
    });
    dateData = randomDate();
    shuffledArray.unshift({
        id: datatype.uuid(),
        userId: datatype.uuid(),
        hostName: name.findName(),
        avatar: image.avatar(),
        isSoldOut,
        eventImage: eventImages[datatype.number({ min: 0, max: 24 })],
        eventName: company.companyName(),
        bookable: !isSoldOut,
        ticketsAvailable: 0,
        time: dateData.date.getTime(),
        // date: dateData.date,
        eventStartDatetime: moment(dateData.date).format('MM/DD/YYYY, hh:mm A'),
        // eventStartDatetime: '04/08/2021, 11:00 AM',
        isLive: true,
        isHost: authState ? false : datatype.boolean(),
    });

    return shuffledArray;
};
