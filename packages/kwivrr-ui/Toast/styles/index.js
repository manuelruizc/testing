const styles = ({ isAndroid }) => {
    if (isAndroid) {
        return {
            container: {
                width: '94%',
                height: 80,
                borderRadius: 18,
                backgroundColor: 'white',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 22,
                elevation: 5,
            },
            infoContainer: {
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
            },
            close: {
                padding: 18,
                justifyContent: 'center',
                alignItems: 'center',
            },
            toastText: {
                width: '80%',
            },
            toastIcon: {
                marginRight: 12,
            },
        };
    }
    return {
        container: {
            width: '94%',
            height: 80,
            borderRadius: 18,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 22,
            elevation: 5,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.1,
            shadowRadius: 2,
            shadowColor: 'black',
        },
        infoContainer: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        close: {
            padding: 18,
            justifyContent: 'center',
            alignItems: 'center',
        },
        toastText: {
            width: '80%',
        },
        toastIcon: {
            marginRight: 12,
        },
    };
};

export default styles;
