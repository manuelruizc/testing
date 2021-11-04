const styles = ({ palette, disabledButton, isAndroid }) => {
    return {
        container: {
            alignItems: 'center',
            paddingBottom: 32,
        },
        answerOptions: {
            width: '98%',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            padding: 0,
            marginBottom: 18,
        },
        answerOptionButtonContainer: {
            width: '32%',
        },
        answerOptionButton: {
            width: '100%',
            height: isAndroid ? 32 : 42,
            borderWidth: 2,
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            borderColor: palette.button.primary,
        },
        answerOptionButtonText: {
            color: palette.button.primary,
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
        saveDraft: {
            paddingVertical: 6,
            marginVertical: 6,
        },
        authButtonContainer: {
            marginTop: 12,
            marginBottom: 16,
        },
        authButton: {
            width: 'auto',
            paddingHorizontal: 24,
            opacity: disabledButton ? 0.4 : 1,
        },
    };
};

export default styles;
