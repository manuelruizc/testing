const styles = ({ dhPercentage, isAndroid }) => {
    return {
        optionsContainer: {
            height: isAndroid ? '50%' : '54%',
            width: '96%',
        },
        optionContainer: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginVertical: isAndroid ? 4 : 8,
        },
        optionLabel: {
            width: 32,
            justifyContent: 'center',
            alignItems: 'center',
        },
        inputStyle: {
            width: '100%',
            // height: screenHeight * 0.045dhPercentage(4.5),
            height: dhPercentage(4.5),
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingLeft: 14,
        },
        contentContainerStyle: {
            alignItems: 'flex-start',
        },
    };
};

export default styles;
