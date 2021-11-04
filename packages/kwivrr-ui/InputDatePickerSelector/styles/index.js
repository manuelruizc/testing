const styles = ({ label, dhPercentage }) => {
    return {
        smallDatePickerLabelContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: label ? 'space-between' : 'flex-end',
            alignItems: 'center',
        },
        smallDatePickerTouchable: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
        },
        smallDatePickerTouchable: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'flex-start',
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
    };
};

export default styles;
