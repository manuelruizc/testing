const styles = ({ screenWidth, screenHeight }) => {
    return {
        selector: {
            position: 'absolute',
            right: 64,
            width: 40,
            height: 40,
            backgroundColor: 'white',
            width: 0,
            height: 0,
            borderLeftWidth: 30,
            borderRightWidth: 30,
            borderBottomWidth: 30,
            borderStyle: 'solid',
            backgroundColor: 'transparent',
            borderLeftColor: 'transparent',
            borderRightColor: 'transparent',
            borderBottomColor: 'white',
        },
        closeButton: {
            position: 'absolute',
            top: 8,
            right: 8,
            zIndex: 1000000,
            elevation: 1000000,
        },
        closeButtonIcon: {
            padding: 6,
        },
        container: {
            flex: 1,
        },
        scrollView: {
            flex: 1,
        },
        contentContainerStyle: {
            flexGrow: 1,
            alignItems: 'flex-start',
            paddingHorizontal: 10,
        },
        title: {
            marginTop: 18,
            marginBottom: 8,
        },
        backdropTouchable: {
            width: '100%',
            height: '100%',
        },
    };
};

export default styles;
