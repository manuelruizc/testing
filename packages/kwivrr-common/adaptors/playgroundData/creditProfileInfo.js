import creditHistory from './creditHistory'

const creditProfileInfo = {
  fullName: 'Jim Peterson',
  userId: '1234567',
  avatarUrl: 'https://images.unsplash.com/photo-1581803118522-7b72a50f7e9f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
  numCredits: creditHistory.creditHistory.reduce((total, item) => total + item.numCredits, 0)
}

export default creditProfileInfo
