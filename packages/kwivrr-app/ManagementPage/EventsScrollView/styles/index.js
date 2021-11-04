const styles = ({ screenWidth }) => {
    return {
        container: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        },
        title: {
            paddingHorizontal: 18,
        },
        scrollViewContainer: {
            width: '100%',
            paddingVertical: 14,
        },
        scrollViewContentContainer: {
            // paddingRight: screenWidth * 0.05,
            flexGrow: 1,
        },
        message: {
            paddingLeft: 18,
            marginTop: 12,
        },
        footer: {
            flex: 1,
            width: 80,
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 24,
        },
    };
};

export default styles;
