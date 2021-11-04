import { getRandomFutureDate, getRandomPastDate } from '../playgroundHelpers'

const creditHistory = {
  creditHistory: [
    {
      id: 1,
      numCredits: 50,
      dateProvided: getRandomPastDate(),
      expiry: getRandomFutureDate(),
      usage: 'Lorem',
      reason: 'Refund bonus from design conference'
    },
    {
      id: 2,
      numCredits: -20,
      dateProvided: getRandomPastDate(),
      expiry: getRandomFutureDate(),
      usage: 'Lorem',
      reason: 'Support request'
    },
    {
      id: 3,
      numCredits: 100,
      dateProvided: getRandomPastDate(),
      expiry: getRandomFutureDate(),
      usage: 'Lorem',
      reason: 'Mistake'
    },
    {
      id: 4,
      numCredits: 150,
      dateProvided: getRandomPastDate(),
      expiry: getRandomFutureDate(),
      usage: 'Lorem',
      reason: 'Ipsum'
    }
  ],
  listSummary: {}
}

export default creditHistory
