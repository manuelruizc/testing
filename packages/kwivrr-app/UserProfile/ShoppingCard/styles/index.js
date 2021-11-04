const styles = ({ screenWidth, upcoming, palette }) => {
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
        fallbackCard: {
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
        eventName: {
            width: upcoming ? '70%' : '85%',
        },
        shopBottomInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingTop: 12,
        },
        viewOnWebsiteButton: {
            paddingVertical: 8,
            paddingHorizontal: 12,
            borderRadius: 6,
            backgroundColor: palette.button.primary,
        },
    };
};

export default styles;
