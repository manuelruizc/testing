const styles = ({ screenWidth, screenHeight }) => {
    return {
        container: {
            width: '100%',
            paddingHorizontal: screenWidth * 0.04,
            alignItems: 'center',
            justifyContent: 'center',
        },
        backButtonContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 18,
        },
        image: {
            width: screenWidth * 0.25,
            height: screenHeight * 0.09,
            marginRight: 16,
            borderRadius: 10,
        },
        streamTitle: {
            width: '100%',
            marginBottom: 2,
        },
        infoContainer: {
            alignItems: 'flex-start',
            justifyContent: 'center',
            flex: 1,
        },
        buttonsContainer: {
            flexDirection: 'row',
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        hostContainer: {
            flexDirection: 'row',
            width: '100%',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
    };
};

export default styles;
