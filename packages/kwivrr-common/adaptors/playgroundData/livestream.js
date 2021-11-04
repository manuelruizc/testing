import moment from 'moment';

const getTime = (minutesToSubtract) => {
    const date = new Date();
    return formatTime(new Date(date.getTime() - minutesToSubtract * 60000));
};

const formatTime = (time) => {
    const now = moment();
    const date = moment(time);
    const days = date.diff(now, 'days');
    const hours = date.subtract(days, 'days').diff(now, 'hours');
    const minutes = date.subtract(hours, 'hours').diff(now, 'minutes');

    if (hours) return `${hours * -1} hour`;
    if (minutes) return `${minutes * -1} min`;
    return 'now';
};

const livestream = {
    id: 1000,
    title: 'The Beach!',
    description: '',
    numViewers: 16,
    embedCode: 'https://www.youtube.com/watch?v=UgHKb_7884o',
    comments: [
        {
            id: 1,
            avatarUrl:
                'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
            commenter: 'Richard Daniels',
            dateCommented: getTime(5),
            commentText: 'Hello from Berlin 😎',
        },
        {
            id: 2,
            avatarUrl:
                'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
            commenter: 'Ashley Soukup',
            dateCommented: getTime(5),
            commentText:
                'This is such an amazing view, wish I was there! Are you still in California or are you back home now?',
        },
        {
            id: 3,
            avatarUrl:
                'https://images.unsplash.com/photo-1612214070475-1e73f478188c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            commenter: 'Benjamin Johnson',
            dateCommented: getTime(4),
            commentText: '☝🏾👍🏾👍🏾',
        },
        {
            id: 4,
            avatarUrl:
                'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            commenter: 'Felicity Hendricks',
            dateCommented: getTime(3),
            commentText: '🌎💫',
        },
        {
            id: 5,
            avatarUrl:
                'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1050&q=80',
            commenter: 'Becky White',
            dateCommented: getTime(2),
            commentText: 'woahhh',
        },
        {
            id: 6,
            avatarUrl:
                'https://images.unsplash.com/photo-1507152832244-10d45c7eda57?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=967&q=80',
            commenter: 'Suzie Smith',
            dateCommented: getTime(2),
            commentText: "Great you're streaming again!",
        },
        {
            id: 7,
            avatarUrl:
                'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=635&q=80',
            commenter: 'Danielle Young',
            dateCommented: getTime(1),
            commentText: 'so beautiful!',
        },
        {
            id: 8,
            avatarUrl:
                'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
            commenter: 'Alex Goldstein',
            dateCommented: getTime(0),
            commentText: '🏝🏝',
        },
        {
            id: 9,
            avatarUrl:
                'https://images.unsplash.com/photo-1502767882403-636aee14f873?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
            commenter: 'Marie Swenson',
            dateCommented: getTime(0),
            commentText: "Ohh you're live again!",
        },
    ],
};

export default livestream;
