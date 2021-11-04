const styles = ({ screenHeight, screenWidth, palette }) => {
    return {
        container: {
            flex: 1,
            width: screenWidth,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        input: {
            marginVertical: 18,
            width: '90%',
        },
        inputContainer: {
            width: '90%',
        },
        inputStyle: {
            width: '100%',
            height: screenHeight * 0.045,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingHorizontal: 14,
        },
        scrollView: {
            width: '100%',
            flex: 1,
        },
        contentContainerScrollView: {
            // alignItems: 'center',
        },
        buttonStyle: {
            width: '80%',
            paddingVertical: 24,
            marginVertical: 36,
        },
        modalOptionsInnerStyle: {
            paddingVertical: 30,
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        modalOptionsStyle: {
            height: '96%',
        },
        containerPlaceholder: {
            width: screenWidth,
            maxWidth: screenWidth,
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
        },
        searchbarPlaceholder: {
            width: '100%',
            height: 32,
            marginHorizontal: 18,
            borderRadius: 1000,
            marginTop: 12,
            marginBottom: 32,
            backgroundColor: palette.placeholder,
        },
        ticketPlaceholder: {
            width: '100%',
            height: 100,
            borderRadius: 12,
            marginHorizontal: 18,
            backgroundColor: palette.placeholder,
            marginBottom: 18,
        },
        innerContainerPlaceholder: {
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 18,
        },
        contentContainer: {
            flex: 1,
            width: screenWidth,
            alignItems: 'center',
        },
    };
};

export default styles;
