import eventsList from './eventsList'
const userId = 12345

const isPastDate = (date) => date.setHours(0, 0, 0, 0) < new Date().setHours(0, 0, 0, 0)

const getPublicProfileUpcomingHosting = () => {
  return eventsList.filter(({ startDateTime, hostId }) => !isPastDate(startDateTime) && hostId === userId)
}

export default getPublicProfileUpcomingHosting
