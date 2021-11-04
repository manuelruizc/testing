import getRandomPastDate from '../playgroundHelpers/getRandomPastDate'

const hostTicketsList = (eventIds) => {
  return ([
    {
      id: 1,
      orderId: '0001',
      ticketNumber: '123234345',
      currentTicketHolder: 'ben.anderson@gmail.com',
      ticketStatus: 'attending',
      purchasedBy: 'ben.anderson@gmail.com',
      purchasedDate: getRandomPastDate(),
      ticketType: 'general',
      ticketCost: 10,
      credentialId: '',
      paymentDetails: {
        creditCard: '0444',
        creditsPaid: 5,
        currencyPaid: 5
      }
    },
    {
      id: 2,
      orderId: '0002',
      ticketNumber: '345789123',
      currentTicketHolder: 'julia.marks@gmail.com',
      ticketStatus: 'checked-in',
      purchasedBy: 'angie.lincoln@gmail.com',
      purchasedDate: getRandomPastDate(),
      ticketType: 'vip',
      ticketCost: 50,
      credentialId: '',
      paymentDetails: {
        creditCard: '0444',
        creditsPaid: 10,
        currencyPaid: 40
      }
    },
    {
      id: 3,
      orderId: '0003',
      ticketNumber: '890456234',
      currentTicketHolder: 'angela.brown@gmail.com',
      ticketStatus: 'transferring',
      purchasedBy: 'penelope.glenn@gmail.com',
      purchasedDate: getRandomPastDate(),
      ticketType: 'general',
      ticketCost: 10,
      credentialId: '',
      paymentDetails: {
        creditCard: '0444',
        creditsPaid: 0,
        currencyPaid: 10
      }
    },
    {
      id: 4,
      orderId: '0004',
      ticketNumber: '567789345',
      currentTicketHolder: 'georgia.maple@gmail.com',
      ticketStatus: 'gifted',
      purchasedBy: 'johnny.brock@gmail.com',
      purchasedDate: getRandomPastDate(),
      ticketType: 'general',
      ticketCost: 10,
      credentialId: '',
      paymentDetails: {
        creditCard: '0444',
        creditsPaid: 5,
        currencyPaid: 5
      }
    },
    {
      id: 5,
      orderId: '0005',
      ticketNumber: '678123234',
      currentTicketHolder: 'mary.smalls@gmail.com',
      ticketStatus: 'cancelled',
      purchasedBy: 'maggie.smith@gmail.com',
      purchasedDate: getRandomPastDate(),
      ticketType: 'vip',
      ticketCost: 30,
      credentialId: '',
      paymentDetails: {
        creditCard: '0444',
        creditsPaid: 30,
        currencyPaid: 0
      }
    },
    {
      id: 6,
      orderId: '0006',
      ticketNumber: '93847562',
      currentTicketHolder: 'john.templeton@gmail.com',
      ticketStatus: 'refunded',
      purchasedBy: 'maggie.smith@gmail.com',
      purchasedDate: getRandomPastDate(),
      ticketType: 'general',
      ticketCost: 20,
      credentialId: '',
      paymentDetails: {
        creditCard: '0444',
        creditsPaid: 5,
        currencyPaid: 5
      }
    },
    {
      id: 7,
      orderId: '0005',
      ticketNumber: '678123234',
      currentTicketHolder: 'anita.thompson@gmail.com',
      ticketStatus: 'credited',
      purchasedBy: 'maggie.smith@gmail.com',
      purchasedDate: getRandomPastDate(),
      ticketType: 'general',
      ticketCost: 15,
      credentialId: '',
      paymentDetails: {
        creditCard: '0444',
        creditsPaid: 1,
        currencyPaid: 14
      }
    }
  ])
}

export default hostTicketsList
