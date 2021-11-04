import usersList from './usersList'

const surveysList = [
  {
    id: 1,
    type: 'poll',
    questionText: 'Which social media do you prefer?',
    results: [
      {
        id: 'facebook',
        label: 'Facebook',
        percentChosen: 33,
        isMostChosen: false
      },
      {
        id: 'instagram',
        label: 'Instagram',
        percentChosen: 15,
        isMostChosen: false
      },
      {
        id: 'twitter',
        label: 'Twitter',
        percentChosen: 50,
        isMostChosen: true
      },
      {
        id: 'reddit',
        label: 'Reddit',
        percentChosen: 2,
        isMostChosen: false
      }
    ]
  },
  {
    id: 2,
    type: 'open',
    questionText: 'What do you like most about the beach?',
    results: [
      {
        id: 1,
        user: usersList[0],
        commentText: 'I love that my kids are able to run around and burn off some energy!'
      },
      {
        id: 2,
        user: usersList[1],
        commentText: '🌊🌊🌊🌊🌊'
      },
      {
        id: 3,
        user: usersList[2],
        commentText: 'So when I was younger we would go to the beach with my grandparents but they often didn\'t want to sit by the beach so we had to go to the museum instead.'
      },
      {
        id: 4,
        user: usersList[3],
        commentText: 'Suntanning!!!! 🌞'
      },
      {
        id: 5,
        user: usersList[4],
        commentText: 'It\'s the perfect place to relax on a day off.'
      }
    ]
  }
]

export default surveysList
