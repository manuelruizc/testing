const styles = ({ screenWidth, palette }) => {
    return {
        container: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 12,
            paddingLeft: 12,
        },
        touchableContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        itemImageContainer: {
            width: screenWidth * 0.15,
            height: screenWidth * 0.15,
            borderRadius: screenWidth * 0.15,
            overflow: 'hidden',
            marginRight: 12,
        },
        itemImageContainerFallback: {
            width: screenWidth * 0.15,
            height: screenWidth * 0.15,
            borderRadius: screenWidth * 0.15,
            overflow: 'hidden',
            marginRight: 12,
            backgroundColor: palette.placeholder,
        },
        itemImage: {
            width: '100%',
            height: '100%',
        },
        itemInfo: {
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        nameFallback: {
            width: 120,
            height: 18,
            borderRadius: 1000,
            backgroundColor: palette.placeholder,
            marginBottom: 4,
        },
        taglineFallback: {
            width: 90,
            height: 12,
            borderRadius: 1000,
            backgroundColor: palette.placeholder,
        },
        itemUsername: {
            marginBottom: 4,
        },
    };
};

export default styles;
