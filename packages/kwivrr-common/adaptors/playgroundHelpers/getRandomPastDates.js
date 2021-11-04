const getRandomPastDates = () => {
  const initialStart = new Date()
  const initialEnd = new Date()
  initialEnd.setDate(initialEnd.getDate() - 14)
  const startDate = new Date(initialStart.getTime() + Math.random() * (initialEnd.getTime() - initialStart.getTime()))
  startDate.setHours(startDate.getHours() + Math.round(startDate.getMinutes() / 60))
  startDate.setMinutes(0, 0, 0)
  const endDate = new Date(startDate)
  const randomHours = Math.floor(Math.random() * 24) + 1
  endDate.setTime(endDate.getTime() - randomHours * 60 * 60 * 1000)

  return {
    startDateTime: startDate,
    endDateTime: endDate
  }
}

export default getRandomPastDates
