import * as Yup from 'yup';

export const TicketsSchema = Yup.object().shape({
    regularTickets: Yup.object().shape({
        quantity: Yup.number(),
        price: Yup.number(),
    }),
    vipTickets: Yup.object().shape({
        quantity: Yup.number(),
        price: Yup.number(),
    }),
    generalTicketDescription: Yup.string(),
    vipTicketDescription: Yup.string(),
    tiers: Yup.array(),
});
