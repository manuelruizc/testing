const styles = ({ palette }) => {
    return {
        container: {
            paddingHorizontal: 12,
        },
        scrollViewContainer: {
            width: '100%',
            height: 140,
            marginBottom: 32,
            borderBottomWidth: 1,
            borderColor: palette.divider,
        },
        noGroupsContainer: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
        },
        addNewGroupText: {
            paddingLeft: 12,
            paddingBottom: 18,
        },
        addingNewGroup: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 12,
        },
        inputContainer: {
            backgroundColor: palette.input.backgroundColor,
            width: '65%',
            borderRadius: 8,
        },
        input: {
            width: '100%',
            height: 48,
            paddingHorizontal: 12,
        },
    };
};

export default styles;
