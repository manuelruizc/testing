import eventsList from './eventsList'

const isPastDate = (date) => date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)

const getPublicProfileAttendedEvents = (userId) => {
  return eventsList.filter(({ endDateTime, hostId }) => isPastDate(endDateTime) && hostId !== userId)
}

export default getPublicProfileAttendedEvents
