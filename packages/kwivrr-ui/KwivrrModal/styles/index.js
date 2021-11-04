const styles = ({ screenWidth, screenHeight }) => {
    return {
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: screenWidth,
            height: screenHeight,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000000,
            elevation: 1000000,
        },
        containerNavigation: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: screenWidth,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 100000,
            zIndex: 10000000,
        },
        closeButtonContainer: {
            width: '100%',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingHorizontal: 18,
            paddingVertical: 18,
        },
        scrollView: {
            // flex: 1,
        },
        scrollViewContent: {
            alignItems: 'center',
        },
        headerTitle: {
            marginBottom: 24,
            textAlign: 'center',
        },
        documentText: {
            width: '80%',
            marginBottom: 18,
        },
        pressable: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
        },
    };
};

export default styles;
