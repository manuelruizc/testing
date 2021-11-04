const styles = ({ screenWidth, screenHeight, palette }) => {
    return {
        container: {
            width: '100%',
            paddingHorizontal: screenWidth * 0.04,
        },
        backButtonContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 18,
        },
        scrollView: {
            flex: 1,
            width: '100%',
        },
        image: {
            width: screenWidth * 0.25,
            height: screenHeight * 0.08,
            marginRight: 16,
            borderRadius: 10,
        },
        streamTitle: {
            width: '100%',
        },
        infoContainer: {
            alignItems: 'flex-start',
            justifyContent: 'center',
            width: screenWidth * 0.58,
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
        containerPlaceholder: {
            width: '100%',
            paddingHorizontal: screenWidth * 0.04,
        },
        backPlaceholder: {
            height: 28,
            borderRadius: 1000,
            backgroundColor: palette.placeholder,
            width: '35%',
        },
        imagePlaceholder: {
            width: screenWidth * 0.25,
            height: screenHeight * 0.08,
            marginRight: 16,
            borderRadius: 10,
            backgroundColor: palette.placeholder,
        },
        titlePlaceholder: {
            width: '90%',
            height: 16,
            marginBottom: 6,
            borderRadius: 1000,
            backgroundColor: palette.placeholder,
        },
        datePlaceholder: {
            width: '50%',
            height: 16,
            marginBottom: 6,
            borderRadius: 1000,
            backgroundColor: palette.placeholder,
        },
        hostPlaceholder: {
            width: '40%',
            height: 16,
            borderRadius: 1000,
            backgroundColor: palette.placeholder,
        },
    };
};

export default styles;
