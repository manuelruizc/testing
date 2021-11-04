import getRandomFutureDates from '../playgroundHelpers/getRandomFutureDates';
import getRandomPastDates from '../playgroundHelpers/getRandomPastDates';
import speakersList from './speakersList';

const getUuid = () => Math.random();

const userId = 12345;
const userFullName = 'Meghan Hendricks';
const userAvatarUrl =
    'https://images.unsplash.com/photo-1563306406-e66174fa3787?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80';

const ticketDataSoldOut = {
    isSoldOut: true,
    isTicketed: true,
    ga: {
        label: 'General',
        numTotal: 1000,
        numAvailable: 0,
        price: 5,
        description:
            'For travel restricted countries, you can livestream the whole event from your living room and secure the best seat in the house! Buy your ticket today!',
    },
    vip: {
        label: 'VIP',
        numTotal: 100,
        numAvailable: 0,
        price: 100,
        description:
            'Be seated closer to the stage. Any Agent can purchase a VIP ticket. Seats are limited and on a first come, first serve basis. For in-person attendees only.',
    },
};

const ticketData = {
    isSoldOut: false,
    isTicketed: true,
    ga: {
        label: 'General',
        numTotal: 1000,
        numAvailable: 10,
        price: 5,
        description:
            'For travel restricted countries, you can livestream the whole event from your living room and secure the best seat in the house! Buy your ticket today!',
    },
    vip: {
        label: 'VIP',
        numTotal: 100,
        numAvailable: 5,
        price: 100,
        description:
            'Be seated closer to the stage. Any Agent can purchase a VIP ticket. Seats are limited and on a first come, first serve basis. For in-person attendees only.',
    },
};

const hostTicketData = {
    numAttending: 378,
    grossSales: 2075,
    ticketsSold: {
        general: {
            numTickets: 375,
            price: 5,
        },
        vip: {
            numTickets: 20,
            price: 10,
        },
    },
};

const eventsListApiCall = [
    {
        id: 1,
        hostId: userId,
        hostName: userFullName,
        hostAvatar: userAvatarUrl,
        hostTicketData,
        eventName: 'Duis Bibendum Morbi Non',
        eventImage:
            'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomFutureDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 84517,
        speakers: speakersList,
        ticketData: ticketDataSoldOut,
    },
    {
        id: 2,
        hostId: userId,
        hostName: userFullName,
        hostAvatar: userAvatarUrl,
        hostTicketData,
        eventName: 'Dolor Vel Est Donec Odio Justo',
        eventImage:
            'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomFutureDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 2571,
        speakers: speakersList,
        ticketData,
    },
    {
        id: 3,
        hostId: userId,
        hostName: userFullName,
        hostAvatar: userAvatarUrl,
        hostTicketData,
        eventName: 'Etiam Justo Etiam Pretium Iaculis',
        eventImage:
            'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomFutureDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 51123,
        speakers: speakersList,
        ticketData: ticketDataSoldOut,
    },
    {
        id: 4,
        hostId: userId,
        hostName: userFullName,
        hostAvatar: userAvatarUrl,
        hostTicketData,
        eventName: 'Risus Semper Porta Volutpat',
        eventImage:
            'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomFutureDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 12,
        speakers: speakersList,
        ticketData,
    },
    {
        id: 5,
        hostId: userId,
        hostName: userFullName,
        hostAvatar: userAvatarUrl,
        hostTicketData,
        eventName: 'Nibh Fusce Lacus Purus',
        eventImage:
            'https://images.unsplash.com/photo-1550305080-4e029753abcf?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1502&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomFutureDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: true,
        isPrivate: false,
        numAttending: 42,
        speakers: speakersList,
        ticketData: ticketDataSoldOut,
    },
    {
        id: 6,
        hostId: getUuid(),
        hostName: 'Quatz',
        hostAvatar:
            'https://images.unsplash.com/photo-1589525231707-f2de2428f59c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        eventName: 'Lobortis Ligula Sit Amet',
        eventImage:
            'https://images.unsplash.com/photo-1508997449629-303059a039c0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomFutureDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 286,
        speakers: speakersList,
        ticketData,
    },
    {
        id: 7,
        hostId: getUuid(),
        hostName: 'Photobug',
        hostAvatar:
            'https://images.unsplash.com/photo-1598886221321-26aa46a669f2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        eventName: 'Tincidunt Eu Felis',
        eventImage:
            'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomFutureDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: true,
        isPrivate: false,
        numAttending: 51694,
        speakers: speakersList,
        ticketData: ticketDataSoldOut,
    },
    {
        id: 8,
        hostId: getUuid(),
        hostName: 'Fadeo',
        hostAvatar:
            'https://images.unsplash.com/photo-1529111290557-82f6d5c6cf85?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=639&q=80',
        eventName: 'Pede Malesuada in Imperdiet et Commodo',
        eventImage:
            'https://images.unsplash.com/photo-1560523160-754a9e25c68f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1320&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomFutureDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 1358,
        speakers: speakersList,
        ticketData,
    },
    {
        id: 9,
        hostId: getUuid(),
        hostName: 'Jabbersphere',
        hostAvatar:
            'https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
        eventName: 'Sed Justo Pellentesque Viverra Pede',
        eventImage:
            'https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomFutureDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 512,
        speakers: speakersList,
        ticketData: ticketDataSoldOut,
    },
    {
        id: 10,
        hostId: getUuid(),
        hostName: 'Livepath',
        hostAvatar:
            'https://images.unsplash.com/photo-1579420593648-0deba81fd762?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=80',
        eventName: 'Nunc Proin at Turpis',
        eventImage:
            'https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomFutureDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: true,
        isPrivate: false,
        numAttending: 884,
        speakers: speakersList,
        ticketData,
    },
    {
        id: 11,
        hostId: userId,
        hostName: userFullName,
        hostAvatar: userAvatarUrl,
        hostTicketData,
        eventName: 'Cras mi Pede Malesuada',
        eventImage:
            'https://images.unsplash.com/photo-1516911046066-db186f021455?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomPastDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 1527,
        speakers: speakersList,
        ticketData: ticketDataSoldOut,
    },
    {
        id: 12,
        hostId: userId,
        hostName: userFullName,
        hostAvatar: userAvatarUrl,
        hostTicketData,
        eventName: 'Nam Ultrices Libero',
        eventImage:
            'https://images.unsplash.com/photo-1488861859915-4b5a5e57649f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80https://images.unsplash.com/photo-1569930784237-ea65a2f40a83?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=656&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomPastDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 3452,
        speakers: speakersList,
        ticketData,
    },
    {
        id: 13,
        hostId: userId,
        hostName: userFullName,
        hostAvatar: userAvatarUrl,
        hostTicketData,
        eventName: 'Nulla Mollis Molestie Lorem',
        eventImage:
            'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomPastDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 7376,
        speakers: speakersList,
        ticketData: ticketDataSoldOut,
    },
    {
        id: 14,
        hostId: userId,
        hostName: userFullName,
        hostAvatar: userAvatarUrl,
        hostTicketData,
        eventName: 'Nam Congue Risus Semper Porta Volutpat',
        eventImage:
            'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomPastDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 2683,
        speakers: speakersList,
        ticketData,
    },
    {
        id: 15,
        hostId: userId,
        hostName: userFullName,
        hostAvatar: userAvatarUrl,
        hostTicketData,
        eventName: 'Tempor Turpis Nec Euismod',
        eventImage:
            'https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomPastDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 872,
        speakers: speakersList,
        ticketData: ticketDataSoldOut,
    },
    {
        id: 16,
        hostId: getUuid(),
        hostName: 'Dynazzy',
        hostAvatar:
            'https://images.unsplash.com/photo-1542131596-91a634bfc5e7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
        eventName: 'Ante Ipsum Primis in Faucibus Orci',
        eventImage:
            'https://images.unsplash.com/photo-1505236858219-8359eb29e329?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1130&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomPastDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 348252,
        speakers: speakersList,
        ticketData,
    },
    {
        id: 17,
        hostId: getUuid(),
        hostName: 'Douglas Group',
        hostAvatar:
            'https://images.unsplash.com/photo-1604336732494-d8386c7029e3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80',
        eventName: 'Sapien Iaculis Congue Vivamus Metus',
        eventImage:
            'https://images.unsplash.com/photo-1482575832494-771f74bf6857?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomPastDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 35378,
        speakers: speakersList,
        ticketData: ticketDataSoldOut,
    },
    {
        id: 18,
        hostId: getUuid(),
        hostName: 'Meemm',
        hostAvatar:
            'https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
        eventName: 'Sapien Urna Pretium Nisl ut Volutpat',
        eventImage:
            'https://images.unsplash.com/photo-1473691955023-da1c49c95c78?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomPastDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 3,
        speakers: speakersList,
        ticketData,
    },
    {
        id: 19,
        hostId: getUuid(),
        hostName: 'Pollich, Dare and Farrell',
        hostAvatar:
            'https://images.unsplash.com/photo-1598369685311-a22ca3406009?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        eventName: 'Hac Habitasse Platea Dictumst',
        eventImage:
            'https://images.unsplash.com/photo-1543269865-cbf427effbad?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomPastDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 74,
        speakers: speakersList,
        ticketData: ticketDataSoldOut,
    },
    {
        id: 20,
        hostId: getUuid(),
        hostName: 'Sanford Inc',
        hostAvatar:
            'https://images.unsplash.com/photo-1507331789086-893e9003c0e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        eventName: 'Odio Cras mi Pede',
        eventImage:
            'https://images.unsplash.com/photo-1582192730841-2a682d7375f9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1267&q=80',
        eventDescription:
            "Elevate is our Annual Global Convention. Join us this April in Dallas, Texas to commemorate our 10th year in business. We will be celebrating our top performers, providing world-class training and casting the vision that will carry us for the next decade. Don't miss out!",
        ...getRandomPastDates(),
        provider: 'vimeo',
        embedCode: 'www.mystream.com',
        isLive: false,
        isPrivate: false,
        numAttending: 19,
        speakers: speakersList,
        ticketData,
    },
];

const eventsList = [
    {
        id: '1171',
        type: 'event',
        attributes: {
            id: 1171,
            name: 'upcoming test 2',
            location: null,
            startDate: '2021-09-25T15:51:08.000-05:00',
            endDate: '2021-09-27T15:51:08.000-05:00',
            embedCode: null,
            state: 'v2',
            userId: 5294,
            tenantId: 1,
            liveStreamName: null,
            broadcasted: false,
            liveStreamType: null,
            shopUrl: null,
            learnMoreUrl: null,
            eventType: null,
            shareLink: null,
            eventImageUrl:
                'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1300&q=80',
            // need this one
            isSoldOut: false,
            userTickets: 6,
            isLive: false,
            hostName: 'Lauren Johnson',
            hostAvatar:
                'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            hasWaitList: false,
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
            eventGroups: {
                data: [],
            },
        },
    },
    {
        id: '1210',
        type: 'event',
        attributes: {
            id: 1210,
            name: 'Image Test Event',
            location: null,
            startDate: '2021-09-25T15:51:08.000-05:00',
            endDate: '2021-09-27T15:51:08.000-05:00',
            embedCode: null,
            state: 'v2',
            userId: 5294,
            tenantId: 1,
            liveStreamName: null,
            broadcasted: false,
            liveStreamType: null,
            shopUrl: null,
            learnMoreUrl: null,
            eventType: null,
            shareLink: null,
            eventImageUrl:
                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            // need this one
            isSoldOut: true,
            userTickets: 0,
            isLive: true,
            hostName: 'John Carlin',
            hostAvatar:
                'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=712&q=80',
            hasWaitList: true,
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
            eventGroups: {
                data: [
                    {
                        id: '1',
                        type: 'event_group',
                    },
                ],
            },
        },
    },
    {
        id: '1231',
        type: 'event',
        attributes: {
            id: 1231,
            name: 'awesome Test Event',
            location: null,
            startDate: '2021-09-25T15:51:08.000-05:00',
            endDate: '2021-09-27T15:51:08.000-05:00',
            embedCode: null,
            state: 'v2',
            userId: 5294,
            tenantId: 1,
            liveStreamName: null,
            broadcasted: false,
            liveStreamType: null,
            shopUrl: null,
            learnMoreUrl: null,
            eventType: null,
            shareLink: null,
            eventImageUrl:
                'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
            // need this one
            isSoldOut: true,
            userTickets: 0,
            isLive: true,
            hostName: 'John Carlin',
            hostAvatar:
                'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=712&q=80',
            hasWaitList: false,
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
            eventGroups: {
                data: [
                    {
                        id: '1',
                        type: 'event_group',
                    },
                ],
            },
        },
    },
];

export default eventsList.sort((a, b) => b.startDateTime - a.startDateTime);
