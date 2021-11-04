const styles = ({ screenHeight }) => {
    return {
        container: {
            width: '100%',
            alignItems: 'center',
            paddingBottom: 24,
        },
        button: {
            width: '100%',
        },
        buttonStyle: {
            width: '60%',
        },
        inputStyle: {
            width: '100%',
            height: screenHeight * 0.045,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingLeft: 14,
        },
    };
};

export default styles;
