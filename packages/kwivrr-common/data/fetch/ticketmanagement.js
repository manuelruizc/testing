import faker from 'faker';
import moment from 'moment';
import delayResolve from 'kwivrr-common/delayResolve';
import { TicketStatus } from '../types/status';
import randomProperty from 'kwivrr-common/randomProperty';

function formatedDate(_date) {
    return moment(_date).format('MM/DD/YYYY, HH:mm A');
}

function createHostTickets() {
    const { datatype, internet, name, date } = faker;
    const { number, boolean } = datatype;
    const { email } = internet;
    const { findName } = name;
    const { recent } = date;
    const numberOfTickets = number({ min: 1, max: 12 });
    const tickets = [];
    for (let i = 0; i < numberOfTickets; i++) {
        const isVIP = boolean();
        const ticketStatus = randomProperty(TicketStatus);
        const purchasedBy = email().toLowerCase();
        const ticketHolder = boolean() ? purchasedBy : email().toLowerCase();
        const isCheckedIn = boolean();
        const ticket = {
            id: i,
            orderID: String('000' + number({ min: 1, max: 500 })),
            // ticket status
            isCheckedIn,
            isCancelled: boolean(),
            isCredited: boolean(),
            // ticket status
            ticketHolder,
            purchasedBy,
            username: findName(),
            email: email().toLowerCase(),
            purchasedDateTime: formatedDate(recent()),
            ticketType: isVIP ? 'VIP' : 'GA',
            ticketStatus: isCheckedIn ? TicketStatus.CheckedIn : ticketStatus,
            ticketPrice: isVIP
                ? number({ min: 50, max: 500 }).toFixed(2)
                : number({ min: 10, max: 40 }).toFixed(2),
            credentialID: '-',
        };
        tickets.push(ticket);
    }
    return tickets;
}

function createAttendeeTickets() {
    const { datatype, internet, name, date } = faker;
    const { number, boolean } = datatype;
    const { email } = internet;
    const { findName } = name;
    const { recent } = date;
    const numberOfTickets = number({ min: 1, max: 12 });
    const tickets = [];
    for (let i = 0; i < numberOfTickets; i++) {
        const isVIP = boolean();
        const ticketStatus = randomProperty(TicketStatus);
        const purchasedBy = email().toLowerCase();
        const ticketHolder = boolean() ? purchasedBy : email().toLowerCase();
        const isCheckedIn = boolean();
        const ticket = {
            id: i,
            orderID: String('000' + number({ min: 1, max: 500 })),
            isCheckedIn,
            isCancelled: boolean(),
            isCredited: boolean(),
            ticketHolder,
            purchasedBy,
            name: findName(),
            email: email().toLowerCase(),
            purchasedDateTime: moment(recent()).format('MM/DD/YYYY, HH:mm A'),
            ticketType: isVIP ? 'VIP' : 'GA',
            ticketStatus: isCheckedIn ? TicketStatus.CheckedIn : ticketStatus,
            ticketPrice: isVIP
                ? number({ min: 50, max: 500 }).toFixed(2)
                : number({ min: 10, max: 40 }).toFixed(2),
            credentialID: '-',
            qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAABlBMVEUAAAD///+l2Z/dAAACg0lEQVR4nO3WS3JiQQwEQHP/S89qFg4IUaV+gB1OLfvpU8mKr6+zuv2v4dNQydRhwtMiJAymXo8Yi5AwmHo9YizCnyRMAt1fTV6q9MmtKiHhs/nkhZCQcE5I+Gw+eSF8u/DBt6s9FfUwISEhISEhIeF7hK8bJyQkJCQkJPw5wvtKThASEhISEhK+VJjUbmrYk2Q93bybr6aiHIT7zbv5airKQbjfvJuvpqIchPvNu/lqKspBeL65qyHH5S+fKcIrXz5ThFe+fKYIr3z5TBFe+XIa8bB2v8Kw57Jgly0ivBHmPV2wyxYR3gjzni7YZYsIbx8XVsmG5qGnaq6uT0VI2ISumgnjIiRsQlfNhHFVx4banTjcE+UhJCQkJCQkLG8MV6vmgZq8dJkJCQkJCQkJs7GhJ7mRNCdHd5kJCYfQhISrPIT9xiE04duFQ8RdjmpPVZPn8Bgh4epoFeP0GCHh6mgV4/QY4W8T3qcfPEnoZLzqST4REhISEhISPjz/upedcOkhJCQkJCQkLGHD1K52P0fS/GBzcpWwLsJ6fNqcXCWsi7AenzYnVwnreqswWV0FSn6p4dOukvCEhISEhIR/WTh8q2r3S91/qvZEP9malKdPegjTZsKDInzSQ5g2Ex7UzxUe1pC+8uw2J59Oi/DbC2G9Ofl0WoTfXgjrzcmn0yL89vJh4X2Ooaqp6miymZCQkJCQkPBcWPUkVy+LGASb9hA+7iEkbK4nwQgJCZ9c/d3C4Ua1ufpdOiohISEhISHhC/7TVJUIh+vRz0FISEhISEh4fKO6mgRKbnXNhISEhISEhNtKsu6aqz2XeZJjVzVXewgPinDfXO0hPCjCfXO1508L/wFl9l/gl2v+4QAAAABJRU5ErkJggg==',
        };
        tickets.push(ticket);
    }
    return tickets;
}

function attendeeEventInfo() {
    const { recent } = faker.date;
    const { avatar, business } = faker.image;
    const { findName } = faker.name;
    const { number } = faker.datatype;
    const { city, streetAddress } = faker.address;
    const event = {
        id: number({ min: 1, max: 312 }),
        title: faker.company.companyName(),
        startDatetime: formatedDate(recent()),
        location: city() + ', ' + streetAddress(),
        hostId: number({ min: 1, max: 312 }),
        hostName: findName(),
        hostAvatarUrl: avatar(),
        eventImageUrl: business(),
    };
    const chargeInfo = {
        serviceFee: number({ min: 0.25, max: 3.25, precision: 0.01 }),
        tax: number({ min: 0.25, max: 10, precision: 0.01 }),
    };
    const paymentDetails = {
        name: findName(),
        cardEnding: 1234,
        date: formatedDate(recent()),
    };
    const tickets = createAttendeeTickets();

    const response = {
        event,
        chargeInfo,
        paymentDetails,
        tickets,
        listSummary: {
            page: 1,
            perPage: 10,
            hasMore: true,
        },
    };
    return response;
}

export async function fetchAttendeeData() {
    return delayResolve(attendeeEventInfo);
}

export async function fetchHostTickets() {
    return delayResolve(createHostTickets);
}

// {
//     event: {
//       id,
//       title,
//       start_datetime,
//       location,
//       host_id,
//       host_name,
//       host_avatar_url,
//       event_image_url
//     },
//     tickets: [{
//        id,
//        order_id,
//        is_checked_in,
//        name,
//        email,
//        purchased_datetime,
//        type, (GA vs VIP)
//        price
//     }],
//     listSummary: {
//       page,
//       perPage,
//       hasMore
//     }
//   }
