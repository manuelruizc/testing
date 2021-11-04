import eventsList from './eventsList'
const userId = 12345

const isPastDate = (date) => date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)

const getMyEventsList = () => {
  return ({
    upcoming: {
      total: {
        grossSales: 55,
        numAttending: 11,
        ticketsSold: {
          general: {
            numTickets: 11,
            averagePrice: 5
          },
          vip: {
            numTickets: null,
            averagePrice: null
          }
        }
      },
      streams: eventsList.filter(({ startDateTime, hostId }) => !isPastDate(startDateTime) && hostId === userId)
    },
    registered: {
      total: {},
      streams: eventsList.filter(({ id, startDateTime, hostId }) => !isPastDate(startDateTime) && hostId === userId)
    },
    completed: {
      total: {
        grossSales: 2675,
        numAttending: 480,
        ticketsSold: {
          general: {
            numTickets: 475,
            averagePrice: 5
          },
          vip: {
            numTickets: 30,
            averagePrice: 10
          }
        }
      },
      streams: eventsList.filter(({ endDateTime, hostId }) => isPastDate(endDateTime) && hostId === userId)
    },
    attended: {
      total: {},
      streams: eventsList.filter(({ endDateTime, hostId }) => isPastDate(endDateTime) && hostId !== userId)
    }
  })
}

export default getMyEventsList
