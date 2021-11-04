const styles = () => {
    return {
        container: {
            width: '100%',
            paddingVertical: 8,
        },
        containerData: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            height: 48,
        },
        containerDataEmpty: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: 48,
        },
        existingGroupsContainer: {
            width: '60%',
            height: 48,
        },
        textFallback: {
            width: '30%',
            height: 48,
            backgroundColor: 'gray',
        },
        groupSelection: {
            width: '60%',
        },
        inputStyle: {
            width: '100%',
            height: 40,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            paddingLeft: 14,
            borderWidth: 0,
        },
    };
};

export default styles;
