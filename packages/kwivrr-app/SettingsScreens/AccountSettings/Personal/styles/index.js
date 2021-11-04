const styles = ({ palette, dhPercentage }) => {
    return {
        container: {
            width: '100%',
            marginTop: dhPercentage(2),
            paddingBottom: dhPercentage(3),
            alignItems: 'center',
        },
        divider: {
            marginTop: dhPercentage(3),
            width: '90%',
            borderBottomWidth: 1,
            borderBottomColor: palette.divider,
        },
        row: {
            width: '100%',
            height: 60,
            alignItems: 'center',
            justifyContent: 'center',
        },
        inputContainer: {
            width: '100%',
            height: '100%',
        },
        innerInputStyle: {
            alignSelf: 'center',
            flex: 1,
            width: '100%',
        },
        inputStyle: {
            width: '100%',
            height: '90%',
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            paddingLeft: 14,
            alignSelf: 'center',
        },
        editingHeaderContainer: {
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 24,
        },
        overflowActionIcons: {
            flexDirection: 'row',
            position: 'absolute',
            right: '6%',
            bottom: '-75%',
        },
        overflowActionIcon: {
            borderRadius: 4,
            backgroundColor: 'rgb(235, 237, 245)',
            marginLeft: 12,
        },
        overflowIcon: {
            padding: 10,
        },
        uploadButtonStyle: {
            padding: 1,
            borderRadius: 100,
            backgroundColor: palette.button.primary,
        },
        personalDataContainer: {
            width: '100%',
            height: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingHorizontal: 24,
        },
        fullName: {
            width: '82%',
            textAlign: 'left',
            alignSelf: 'center',
            paddingLeft: 12,
        },
        editButtonFullName: {
            flexDirection: 'row',
            position: 'absolute',
            top: '25%',
            right: 18,
        },
    };
};

export default styles;
