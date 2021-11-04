const styles = () => {
    return {
        autocompleteContainer: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderColor: 'rgba(0, 0, 0, 0.1)',
            paddingVertical: 24,
        },
        autocompleteInputContainer: {
            width: '80%',
        },
        verticalDivider: {
            width: 1,
            height: '40%',
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
        addNewButton: {
            width: 42,
            height: 42,
            backgroundColor: '#3551A1',
            borderRadius: 42,
            justifyContent: 'center',
            alignItems: 'center',
        },
        inputContainer: {
            width: '100%',
        },
        dateTimeSettings: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        smallDatetimePickerContainer: {
            width: '47%',
        },
    };
};

export default styles;
