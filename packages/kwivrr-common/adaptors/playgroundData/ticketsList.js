import { getRandomPastDate } from '../playgroundHelpers'

const ticketsList = [
  {
    id: 1,
    orderId: '7493',
    status: 'attending',
    qrCode: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
    to: '',
    ticketType: 'vip',
    userName: 'Megan Benz',
    userEmail: 'megan.benz@gmail.com',
    chargeInfo: {
      cumulative: {
        ticketType: 'vip',
        numTickets: 1,
        ticketTotal: 40,
        subtotal: 40,
        serviceFee: 1.5,
        tax: 0,
        total: 41.50
      },
      individualCharges: [
        {
          id: 2,
          ticketType: 'vip',
          numTickets: 1,
          ticketTotal: 40,
          subtotal: 20,
          serviceFee: 0,
          tax: 0,
          total: 20,
          purchaseDate: getRandomPastDate()
        },
        {
          id: 3,
          ticketType: 'general',
          numTickets: 1,
          ticketTotal: 20,
          subtotal: 20,
          serviceFee: 1.5,
          tax: 0,
          total: 21.5,
          purchaseDate: getRandomPastDate()
        }
      ],
      paymentDetails: {
        nameOnCard: 'Megan Benz',
        lastFourDigits: '9572'
      }
    }
  },
  {
    id: 2,
    orderId: '4837',
    status: 'checked-in',
    qrCode: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
    to: '',
    ticketType: 'general',
    userName: 'Megan Benz',
    userEmail: 'megan.benz@gmail.com',
    chargeInfo: {
      individualCharges: [
        {
          id: 3,
          ticketType: 'general',
          numTickets: 1,
          ticketTotal: 20,
          subtotal: 20,
          serviceFee: 1.5,
          tax: 0,
          total: 21.5,
          purchaseDate: getRandomPastDate()
        }
      ],
      paymentDetails: {
        nameOnCard: 'Megan Benz',
        lastFourDigits: '9572'
      }
    }
  },
  {
    id: 3,
    orderId: '1296',
    status: 'transferring',
    qrCode: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
    to: 'alex.benz@gmail.com',
    ticketType: 'general',
    userName: 'Megan Benz',
    userEmail: 'megan.benz@gmail.com',
    chargeInfo: {
      individualCharges: [
        {
          id: 3,
          ticketType: 'general',
          numTickets: 1,
          ticketTotal: 20,
          subtotal: 20,
          serviceFee: 1.5,
          tax: 0,
          total: 21.5,
          purchaseDate: getRandomPastDate()
        }
      ],
      paymentDetails: {
        nameOnCard: 'Megan Benz',
        lastFourDigits: '9572'
      }
    }
  },
  {
    id: 4,
    orderId: '4928',
    status: 'gifted',
    qrCode: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
    currentTicketHolder: 'susan.benz@gmail.com',
    ticketType: 'vip',
    userName: 'Megan Benz',
    userEmail: 'megan.benz@gmail.com',
    chargeInfo: {
      cumulative: {
        ticketType: 'vip',
        numTickets: 1,
        ticketTotal: 40,
        subtotal: 40,
        serviceFee: 1.5,
        tax: 0,
        total: 41.50
      },
      individualCharges: [
        {
          id: 2,
          ticketType: 'vip',
          numTickets: 1,
          ticketTotal: 40,
          subtotal: 20,
          serviceFee: 0,
          tax: 0,
          total: 20,
          purchaseDate: getRandomPastDate()
        },
        {
          id: 3,
          ticketType: 'general',
          numTickets: 1,
          ticketTotal: 20,
          subtotal: 20,
          serviceFee: 1.5,
          tax: 0,
          total: 21.5,
          purchaseDate: getRandomPastDate()
        }
      ],
      paymentDetails: {
        nameOnCard: 'Megan Benz',
        lastFourDigits: '9572'
      }
    }
  },
  {
    id: 5,
    orderId: '2485',
    status: 'cancelled',
    qrCode: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
    to: '',
    userName: 'Megan Benz',
    ticketType: 'general',
    userEmail: 'megan.benz@gmail.com',
    chargeInfo: {
      individualCharges: [
        {
          id: 3,
          ticketType: 'general',
          numTickets: 1,
          ticketTotal: 20,
          subtotal: 20,
          serviceFee: 1.5,
          tax: 0,
          total: 21.5,
          purchaseDate: getRandomPastDate()
        }
      ],
      paymentDetails: {
        nameOnCard: 'Megan Benz',
        lastFourDigits: '9572'
      }
    }
  },
  {
    id: 6,
    orderId: '8361',
    status: 'refunded',
    qrCode: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
    refund: 10,
    to: '',
    ticketType: 'general',
    userName: 'Megan Benz',
    userEmail: 'megan.benz@gmail.com',
    chargeInfo: {
      individualCharges: [
        {
          id: 3,
          ticketType: 'general',
          numTickets: 1,
          ticketTotal: 20,
          subtotal: 20,
          serviceFee: 1.5,
          tax: 0,
          total: 21.5,
          purchaseDate: getRandomPastDate()
        }
      ],
      paymentDetails: {
        nameOnCard: 'Megan Benz',
        lastFourDigits: '9572'
      }
    }
  },
  {
    id: 7,
    orderId: '1916',
    status: 'credited',
    qrCode: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png',
    credit: 45,
    to: '',
    ticketType: 'vip',
    userName: 'Megan Benz',
    userEmail: 'megan.benz@gmail.com',
    chargeInfo: {
      cumulative: {
        ticketType: 'vip',
        numTickets: 1,
        ticketTotal: 40,
        subtotal: 40,
        serviceFee: 1.5,
        tax: 0,
        total: 41.50
      },
      individualCharges: [
        {
          id: 2,
          ticketType: 'vip',
          numTickets: 1,
          ticketTotal: 40,
          subtotal: 20,
          serviceFee: 0,
          tax: 0,
          total: 20,
          purchaseDate: getRandomPastDate()
        },
        {
          id: 3,
          ticketType: 'general',
          numTickets: 1,
          ticketTotal: 20,
          subtotal: 20,
          serviceFee: 1.5,
          tax: 0,
          total: 21.5,
          purchaseDate: getRandomPastDate()
        }
      ],
      paymentDetails: {
        nameOnCard: 'Megan Benz',
        lastFourDigits: '9572'
      }
    }
  }
]

export default ticketsList
