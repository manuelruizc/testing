const styles = ({ screenWidth, palette, upcoming }) => {
    return {
        eventsContainer: {
            width: '100%',
            flex: 1,
        },
        card: {
            width: screenWidth * 0.76,
            backgroundColor: 'white',
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.15)',
            marginRight: screenWidth * 0.04,
        },
        cardFallback: {
            width: screenWidth * 0.76,
            backgroundColor: palette.placeholder,
            borderRadius: 10,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.15)',
            marginRight: screenWidth * 0.04,
        },
        cardImage: {
            width: '100%',
            height: 180,
        },
        cardFooter: {
            paddingVertical: 12,
            paddingHorizontal: 12,
        },
        topInfo: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 6,
        },
        topInfoOptions: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        eventNameButton: {
            width: upcoming ? '70%' : '90%',
        },
        eventName: {
            width: '100%',
        },
    };
};

export default styles;
