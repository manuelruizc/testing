import eventsList from './eventsList'

const getPublicProfileUpcomingAttending = (userId) => {
  return eventsList.filter((event, idx) => idx < 3)
}

export default getPublicProfileUpcomingAttending
