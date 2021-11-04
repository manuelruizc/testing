const styles = ({ screenHeight }) => {
    return {
        container: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingVertical: 18,
        },
        radioButtonsContainer: {
            marginBottom: 8,
        },
        autocompleteInputContainer: {
            width: '80%',
            marginVertical: 18,
        },
        inputStyle: {
            width: '100%',
            height: screenHeight * 0.045,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingLeft: 14,
        },
        userSelectedContainer: {
            width: '80%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        userSelected: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        usersContainer: {
            marginVertical: 6,
            width: '90%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        userContainer: {
            width: '100%',
            paddingHorizontal: 6,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
        },
        userAdmin: {
            flexDirection: 'row',
        },
        userAdminName: {
            marginLeft: 12,
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
    };
};

export default styles;
