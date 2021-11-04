const styles = ({ screenWidth }) => {
    return {
        attendedEventCard: {
            width: screenWidth * 0.52,
            marginLeft: screenWidth * 0.03,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: 'rgba(0, 0, 0, 0.15)',
            borderRadius: 8,
        },
        attendedEventCardImage: {
            width: '100%',
            height: screenWidth * 0.3,
        },
        attendedEventInfo: {
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingHorizontal: 10,
            paddingVertical: 12,
        },
        title: {
            width: '100%',
            marginBottom: 4,
        },
    };
};

export default styles;
