const styles = ({ screenWidth }) => {
    return {
        footageContainer: {
            width: screenWidth,
            marginTop: 28,
        },
        footage: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexWrap: 'wrap',
        },
        footageCard: {
            width: screenWidth * 0.52,
            marginBottom: 18,
            borderWidth: 2,
            borderColor: 'rgba(0, 0, 0, 0.15)',
            borderRadius: 8,
        },
        footageCardImage: {
            width: '100%',
            height: screenWidth * 0.48,
        },
        footageInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 8,
            paddingVertical: 8,
        },
        footageIcons: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
    };
};

export default styles;
