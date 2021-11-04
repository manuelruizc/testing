const styles = ({ label }) => {
    return {
        doubleTextInputContainer: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
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
        sharedSwitch: {
            flexDirection: 'row',
            width: 150,
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 12,
        },
        sharedSwitchLabel: {
            marginRight: 18,
        },
    };
};

export default styles;
