const styles = ({ screenWidth, screenHeight }) => {
    return {
        container: {
            flex: 1,
            backgroundColor: 'white'
        },
        header: {
            width: '100%',
            height: screenHeight * 0.08,
            paddingLeft: 18,
            justifyContent: 'center',
            marginBottom: 14,
            alignItems: 'flex-start'
        },
        content: {
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        buttonContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center'
        }
    }
};

export default styles;
