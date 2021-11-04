const styles = ({ screenWidth, screenHeight }) => {
    return {
        container: {
            width: '100%',
            height: 200,
            position: 'absolute',
            top: 0,
            left: 0,
            marginTop: 92,
            backgroundColor: 'tomato',
        },
        textButton: {
            // font
        },
        headerContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
        },
        closeMenuContainer: {
            flex: 1,
            position: 'absolute',
            top: 0,
            right: 40,
        },
        backdropTouchable: {
            width: '100%',
            height: '100%',
        },
    };
};

export default styles;
