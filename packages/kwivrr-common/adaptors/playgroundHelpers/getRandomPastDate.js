const getRandomPastDate = () => {
  const start = new Date(Date.now() - 12096e5) // two weeks ago
  const end = new Date()
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
}

export default getRandomPastDate
