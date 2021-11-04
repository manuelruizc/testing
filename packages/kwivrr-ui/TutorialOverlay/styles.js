const styles = ({ screenWidth }) => {
    return {
        container: {
            flex: 1,
            width: '100%',
        },
        scrollView: {
            flex: 1,
        },
        scrollViewContent: {
            alignItems: 'center',
        },
        tutorialCard: {
            width: screenWidth * 0.95,
            height: '100%',
            paddingBottom: 24,
            paddingVertical: 48,
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        visualFeedbackContainer: {
            width: screenWidth,
            height: screenWidth * 0.95 * 0.5625,
            backgroundColor: 'black',
        },
        tutorialCardDescription: {
            width: '92%',
            paddingVertical: 18,
        },
        buttonsContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 18,
        },
        dots: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
        },
        skipContainer: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
        },
    };
};

export default styles;
