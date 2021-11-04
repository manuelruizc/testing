const styles = ({ screenWidth }) => {
    return {
        container: {
            width: screenWidth * 0.85,
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.25)',
            marginLeft: screenWidth * 0.02,
            marginRight: screenWidth * 0.02,
        },
        image: {
            width: '100%',
            height: 210,
        },
        fullImage: {
            width: '100%',
            height: '100%',
        },
        eventName: {
            width: '100%',
        },
        bottomInfoContainer: {
            width: '100%',
            paddingVertical: 18,
            paddingHorizontal: 18,
        },
        topInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        streamTitle: {
            width: '50%',
        },
        ticketPill: {
            width: '28%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        actions: {
            width: '40%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        dateTime: {
            marginTop: 8,
        },
    };
};

export default styles;
