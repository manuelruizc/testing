import getRandomFutureDates from '../playgroundHelpers/getRandomFutureDates';
const getUuid = () => Math.random();

const myEventsList = [
    {
        id: getUuid(),
        eventName: 'Beach Exploration',
        eventImage:
            'https://images.unsplash.com/photo-1506477331477-33d5d8b3dc85?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=674&q=80',
        ...getRandomFutureDates(),
        numAttending: 4,
        ticketsSold: {
            general: {
                numTickets: 4,
                price: 5,
            },
            vip: {
                numTickets: null,
                price: null,
            },
        },
        grossSales: 20,
    },
    {
        id: getUuid(),
        eventName: 'Looking for Shells',
        eventImage:
            'https://images.unsplash.com/photo-1572720350370-8080412fc75b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=968&q=80',
        ...getRandomFutureDates(),
        numAttending: 7,
        ticketsSold: {
            general: {
                numTickets: 7,
                price: 5,
            },
            vip: {
                numTickets: null,
                price: null,
            },
        },
        grossSales: 35,
    },
];

export default myEventsList;
