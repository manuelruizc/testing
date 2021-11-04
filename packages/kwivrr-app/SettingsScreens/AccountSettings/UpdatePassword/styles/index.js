const styles = ({ dwPercentage, dhPercentage }) => {
    return {
        containerPasswordChange: {
            paddingBottom: 24,
            width: '100%',
            paddingHorizontal: 36,
            alignItems: 'center',
        },
        modalStyle: {
            marginTop: dhPercentage(-40),
        },
        inputStyle: {
            width: dwPercentage(80),
            height: 40,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 18,
            paddingLeft: 14,
        },
        inputContainer: {
            width: '100%',
        },
        authButton: {
            width: '80%',
            marginVertical: 12,
        },
    };
};

export default styles;
