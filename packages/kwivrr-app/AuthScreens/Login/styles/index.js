const styles = ({ screenWidth, screenHeight }) => {
    return {
        container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        innerContainer: {
            width: screenWidth * 0.9,
            height: '100%',
            paddingTop: 10,
            paddingBottom: 140,
            alignItems: 'center',
            justifyContent: 'space-between',
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
        middleComponents: {
            width: '90%',
            alignItems: 'center',
        },
        inputContainer: {
            width: '100%',
        },
        inputStyle: {
            width: '100%',
            height: 40,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 18,
            paddingLeft: 14,
        },
        label: {
            marginBottom: 18,
        },
        bottomComponents: {
            alignItems: 'center',
            width: '100%',
        },
        forgotPassword: {
            marginTop: 12,
        },
    };
};

export default styles;
