const styles = ({ screenWidth, palette }) => {
    return {
        container: {
            width: screenWidth,
            flex: 1,
            // borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.25)',
            // marginLeft: screenWidth * 0.02,
            // marginRight: screenWidth * 0.02,
        },
        cardContainer: {
            width: screenWidth * 0.85,
            borderRadius: 12,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.25)',
            marginRight: 18,
        },
        image: {
            width: '100%',
            height: 210,
            backgroundColor: palette.placeholder,
        },
        bottomInfo: {
            paddingHorizontal: 12,
            paddingVertical: 18,
        },
        topInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        topInfoPlaceholder: {
            width: '70%',
            height: 28,
            backgroundColor: palette.placeholder,
            borderRadius: 1000,
        },
        dateTimePlaceholder: {
            marginTop: 8,
            width: '50%',
            height: 22,
            backgroundColor: palette.placeholder,
            borderRadius: 1000,
        },
    };
};

export default styles;
