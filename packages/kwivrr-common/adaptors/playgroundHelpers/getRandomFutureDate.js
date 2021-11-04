const getRandomFutureDate = () => {
  const start = new Date(Date.now() + 12096e5) // two weeks in the future
  const end = new Date()
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export default getRandomFutureDate
