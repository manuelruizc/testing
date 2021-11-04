const styles = ({ screenWidth, screenHeight }) => {
    return {
        parentContainer: {
            width: '100%',
            flex: 1,
        },
        scrollViewParentContainer: {
            flex: 1,
            width: '100%',
        },
        scrollViewParentContentContainerStyle: {
            alignItems: 'center',
        },
        container: {
            position: 'absolute',
            top: 0,
            left: 0,
            width: screenWidth,
            height: '90%',
            justifyContent: 'center',
            alignItems: 'center',
        },
        closeButtonContainer: {
            width: '100%',
            alignItems: 'flex-end',
            justifyContent: 'center',
            paddingHorizontal: 18,
            paddingVertical: 18,
        },
        scrollView: {
            flex: 1,
        },
        scrollViewContent: {
            flexGrow: 1,
            alignItems: 'center',
        },
        headerTitle: {
            marginBottom: 32,
        },
        documentText: {
            width: '80%',
            marginBottom: 18,
        },
    };
};

export default styles;
