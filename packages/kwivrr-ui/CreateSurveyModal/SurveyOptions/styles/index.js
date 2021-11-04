const styles = ({
    palette,
    screenHeight,
    dhPercentage,
    label,
    isTextAnswer,
    isAndroid,
}) => {
    return {
        container: {
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        questionInputStyle: {
            width: '100%',
            height: isTextAnswer ? 80 : dhPercentage(5.5),
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingLeft: 14,
            marginBottom: isAndroid ? 0 : 12,
        },
        inputStyle: {
            width: '100%',
            height: dhPercentage(4.5),
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingLeft: 14,
        },
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
        surveyDeliveryContainer: {
            width: '90%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: isTextAnswer ? 0 : 0,
        },
        row: {
            width: '94%',
        },
        placeholderStyle: {
            color: 'rgba(0, 0, 0, 0.2)',
            fontSize: 15,
            fontFamily: 'Rubik-Light',
        },
        divider: {
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            marginVertical: 18,
        },
        addNewAnswerText: {
            paddingBottom: 8,
        },
        inputDatePicker: {
            width: '46%',
        },
    };
};

export default styles;
