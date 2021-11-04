const styles = ({ screenWidth, screenHeight }) => {
    return {
        container: {
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        inputContainer: {
            width: '100%',
            paddingVertical: 12,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'rgba(0, 0, 0, 0.2)',
        },
        scrollViewContainer: {
            flex: 1,
            width: '100%',
        },
        scrollView: {
            flex: 1,
        },
        scrollViewContent: {
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        itemContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingVertical: 12,
            paddingLeft: 22,
        },
        noSearchFound: {
            width: '100%',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingVertical: 12,
            paddingLeft: 24,
        },
        inputDatePicker: {
            width: '48%',
        },
        inputDatePickers: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            paddingTop: 12,
        },
        searchbar: {
            height: 46,
        },
    };
};

export default styles;
