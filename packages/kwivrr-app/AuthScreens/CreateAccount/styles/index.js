const styles = ({ screenWidth, screenHeight }) => {
    return {
        mainContainer: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            width: screenWidth,
            height: screenHeight,
        },
        container: {
            width: screenWidth * 0.9,
            height: '100%',
            paddingTop: 10,
            alignItems: 'center',
            justifyContent: 'space-around',
        },
        logo: {
            width: 200,
            height: screenWidth * 0.33,
        },
        kwivrrGradient: {
            position: 'absolute',
            top: 0,
            left: 0,
            height: screenHeight,
        },
        inputContainer: {
            width: '100%',
        },
        inputStyle: {
            width: '100%',
            height: screenHeight * 0.045,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingLeft: 14,
        },
        userAgreement: {
            textAlign: 'center',
            lineHeight: 20,
            marginBottom: 18,
        },
        textUnderline: {
            textDecorationLine: 'underline',
        },
    };
};

export default styles;
