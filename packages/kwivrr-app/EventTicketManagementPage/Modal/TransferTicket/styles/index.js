const styles = ({ screenHeight }) => {
    return {
        subTitle: {},
        inputStyle: {
            width: '100%',
            height: screenHeight * 0.045,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingHorizontal: 14,
            fontSize: 16,
        },
        buttonStyle: {
            width: 'auto',
            paddingHorizontal: 42,
            paddingVertical: 12,
            marginVertical: 42,
        },
    };
};

export default styles;
