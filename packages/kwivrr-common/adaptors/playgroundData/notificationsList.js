import getRandomPastDate from '../playgroundHelpers/getRandomPastDate'

const notificationsList = [
  {
    id: 1,
    avatar: 'https://images.unsplash.com/photo-1598369685311-a22ca3406009?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    message: 'Austin SteamyBeans is live',
    eventName: 'Austin Coffee Shop Open Mic',
    eventId: 1,
    timeStamp: getRandomPastDate()
  },
  {
    id: 2,
    avatar: 'https://images.unsplash.com/photo-1507331789086-893e9003c0e2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    message: 'Ashlee Perry started following you',
    eventName: '',
    timeStamp: getRandomPastDate()
  },
  {
    id: 3,
    avatar: 'https://images.unsplash.com/photo-1595152452543-e5fc28ebc2b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    message: 'Benjamin Xi started following you',
    eventName: '',
    timeStamp: getRandomPastDate()
  },
  {
    id: 4,
    avatar: 'https://images.unsplash.com/photo-1531078215167-91fcfe45b39e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1398&q=80',
    message: 'IceCreamPalace created an event',
    eventName: 'How We Make Ice Cream',
    eventId: 2,
    timeStamp: getRandomPastDate()
  },
  {
    id: 5,
    avatar: 'https://images.unsplash.com/photo-1584088743546-db0289ee9b07?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
    message: 'TropicalWalks is live',
    eventName: 'Costa Rica Nature Walk',
    eventId: 3,
    timeStamp: getRandomPastDate()
  },
  {
    id: 6,
    avatar: 'https://images.unsplash.com/photo-1611055183228-3728743f763f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    message: 'TropicalWalks stream is staring soon',
    eventName: 'Costa Rica Nature Walk',
    eventId: 4,
    timeStamp: getRandomPastDate()
  },
  {
    id: 7,
    avatar: 'https://images.unsplash.com/photo-1526527994352-86c690c2e666?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1407&q=80',
    message: 'Christopher Garcia-Rodriguez created an event',
    eventId: 5,
    eventName: 'Fashion Seminar',
    timeStamp: getRandomPastDate()
  },
  {
    id: 8,
    avatar: 'https://images.unsplash.com/photo-1527628271016-d588989ff264?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
    message: 'Kate Hill sent you a ticket',
    eventName: 'Live from Versailles',
    timeStamp: getRandomPastDate()
  },
  {
    id: 9,
    avatar: 'https://images.unsplash.com/photo-1535227857669-ca980b0b36be?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    message: 'Kwivvr update 2.0 is now live',
    eventName: '',
    timeStamp: getRandomPastDate()
  },
  {
    id: 10,
    avatar: 'https://images.unsplash.com/photo-1533220231407-6810d17a4012?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    message: 'Kate Hill started following you',
    eventName: '',
    timeStamp: getRandomPastDate()
  },
  {
    id: 11,
    avatar: 'https://images.unsplash.com/photo-1577079664479-6549e035ae07?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
    message: 'TropicalWalks created an event',
    eventName: 'Walking Through Arenal Volcano National Park',
    eventId: 6,
    timeStamp: getRandomPastDate()
  },
  {
    id: 12,
    avatar: 'https://images.unsplash.com/photo-1529331722851-d474318e050e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80',
    message: 'Andrew Buck started following you',
    eventName: '',
    timeStamp: getRandomPastDate()
  },
  {
    id: 13,
    avatar: 'https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIwfHxoZWFkc2hvdCUyMGhhcHB5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    message: 'Your content is now ready to sell',
    eventName: 'Successful Marketing Practices',
    timeStamp: getRandomPastDate()
  },
  {
    id: 14,
    avatar: 'https://images.unsplash.com/photo-1606513542745-97629752a13b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTIwfHxoZWFkc2hvdCUyMGhhcHB5fGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
    message: 'Zia King created an event',
    eventName: 'Skating LA',
    eventId: 7,
    timeStamp: getRandomPastDate()
  }
]

export default notificationsList.sort((a, b) => b.timeStamp - a.timeStamp)
