const styles = ({ eventImage, isAndroid }) => {
    return {
        container: {
            width: '100%',
            flex: 1,
            paddingHorizontal: 12,
            paddingVertical: isAndroid ? 12 : 18,
            paddingTop: eventImage ? (isAndroid ? 12 : 20) : 0,
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        topInfo: {
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        touchableEventName: {
            width: '70%',
        },
        eventName: {
            width: '100%',
        },
        leftOptions: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            height: 'auto',
        },
        shareButton: {
            marginLeft: 8,
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
        },
        shareIcon: {
            padding: 8,
            justifyContent: 'center',
            alignItems: 'center',
        },
        eventStartDatetime: {
            marginTop: 14,
        },
        liveBug: {
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-end',
        },
    };
};

export default styles;
