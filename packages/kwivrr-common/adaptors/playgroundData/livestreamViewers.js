const getUuid = () => Math.random();

const livestreamViewers = [
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=675&q=80',
        viewerName: 'Richard Daniels',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        viewerName: 'Ashley Soukup',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1514222709107-a180c68d72b4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
        viewerName: 'Benjamin Johnson',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1611432579699-484f7990b127?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        viewerName: 'Felicity Hendricks',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1601931935821-5fbe71157695?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=564&q=80',
        viewerName: 'Becky White',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1530268729831-4b0b9e170218?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
        viewerName: 'Suzie Smith',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1614644147798-f8c0fc9da7f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
        viewerName: 'Danielle Young',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1580518324671-c2f0833a3af3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        viewerName: 'Alex Golstein',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=634&q=80',
        viewerName: 'Marie Swenson',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1614644147724-2d4785d69962?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=700&q=80',
        viewerName: 'Gertrude Perry',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1528763380143-65b3ac89a3ff?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=635&q=80',
        viewerName: 'Catherine Isaacs',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1617037448248-6bd7b4a0d038?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80',
        viewerName: 'Penelope Christian',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1598886221209-99421ca9452e?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        viewerName: 'Leah Garcia',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1607569708758-0270aa4651bd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        viewerName: 'Ash Winklevoss',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1523477800337-966dbabe060b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        viewerName: 'Vanessa Pur',
    },
    {
        id: getUuid(),
        avatarUrl:
            'https://images.unsplash.com/photo-1520341280432-4749d4d7bcf9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80',
        viewerName: 'William Yang',
    },
];

export default livestreamViewers;
