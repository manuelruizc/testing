const styles = ({ palette }) => {
    return {
        container: {
            width: '100%',
            borderTopLeftRadius: 14,
            borderTopRightRadius: 14,
            backgroundColor: palette.common.white,
            // transform: [
            //     {
            //         translateY: -14,
            //     },
            // ],
            backgroundColor: 'white',
        },
        topInfo: {
            width: '100%',
            flexDirection: 'row',
        },
        sideIcons: {
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'flex-start',
            paddingVertical: 12,
        },
        sideIconsSocialMedia: {
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            paddingVertical: 12,
        },
        sideIconSocialMedia: {
            width: '33%',
            marginBottom: 12,
        },
        avatarContainer: {
            width: 100,
        },
        avatar: {
            width: 100,
            height: 100,
            borderWidth: 6,
            borderColor: palette.common.white,
            borderRadius: 100,
            position: 'absolute',
            top: -30,
        },
        avatarImage: {
            width: '100%',
            height: '100%',
            borderRadius: 100,
        },
        bottomInfo: {
            marginTop: 100 / 3,
            width: '100%',
            alignItems: 'center',
        },
        name: {
            width: '80%',
            textAlign: 'center',
            marginBottom: 12,
        },
        modalStyle: {
            padding: 0,
            backgroundColor: 'transparent',
        },
        innerModalStyle: {
            padding: 0,
            alignItems: 'center',
            justifyContent: 'center',
        },
    };
};

export default styles;
