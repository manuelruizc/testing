const styles = ({ screenWidth }) => {
    return {
        container: {
            flex: 1,
            width: screenWidth,
            justifyContent: 'flex-start',
            paddingTop: 24,
            alignItems: 'center',
            width: screenWidth,
        },
        containerLoader: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        scrollView: {
            flex: 1,
        },
        scrollViewContentContainer: {
            paddingBottom: 48,
        },
        scrollViewWithMargin: {
            marginBottom: 24,
        },
    };
};

export default styles;
