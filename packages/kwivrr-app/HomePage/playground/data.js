import faker from 'faker';
import { orderBy } from 'lodash';
import moment from 'moment';

export const eventImages = [
    'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80',
    'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1503428593586-e225b39bddfe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1522158637959-30385a09e0da?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1430&q=80',
    'https://images.unsplash.com/photo-1508997449629-303059a039c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1320&q=80',
    'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1490&q=80',
    'https://images.unsplash.com/photo-1550305080-4e029753abcf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1351&q=80',
    'https://images.unsplash.com/photo-1528605105345-5344ea20e269?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1549605775-b5b37eefbb1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1517456793572-1d8efd6dc135?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1523379882969-04477e5c1e90?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1549605798-67bc299c55e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1569169061636-57f84e4814f4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1561489396-888724a1543d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1560523159-fbe43c0b465f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    'https://images.unsplash.com/photo-1560523159-4a9692d222ef?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
];

export const randomDate = () => {
    const randomIndex = Math.floor(Math.random() * 3) + 1;
    const { date } = faker;
    if (randomIndex === 1) {
        return {
            date: date.soon(),
            type: 'soon',
        };
    }
    return {
        date: date.recent(),
        type: 'recent',
    };
};

export const createData = (loggedOut = false) => {
    const dataLength = 14;
    const { image, datatype, name, company } = faker;
    let data = [];
    for (let i = 0; i < dataLength; i++) {
        const dateData = randomDate();
        const isSoldOut = datatype.boolean();
        const object = {
            id: datatype.uuid(),
            userId: datatype.uuid(),
            hostName: name.findName(),
            avatar: image.avatar(),
            isSoldOut,
            eventImage: eventImages[datatype.number({ min: 0, max: 24 })],
            eventName: company.companyName(),
            bookable: !isSoldOut,
            ticketsAvailable: datatype.number({
                min: 0,
                max: 20,
            }),
            // time: dateData.date.getTime(),
            // date: dateData.date,
            eventStartDatetime: moment(dateData.date).format(
                'MM/DD/YYYY, hh:mm A'
            ),
            // eventStartDatetime: '04/08/2021, 11:00 AM',
            isLive:
                dateData.type === 'future' || dateData.type === 'soon'
                    ? false
                    : datatype.boolean(),
            isHost: loggedOut ? false : datatype.boolean(),
        };
        data.push(object);
    }
    const orderedData = orderBy(data, ['time'], ['asc']);
    return orderedData;
};

export const loggedOutEvents = createData();
export const loggedInEvents = createData(true);
