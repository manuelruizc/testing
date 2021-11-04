const styles = ({ linkTitle, palette }) => {
    return {
        container: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            paddingVertical: 10,
            paddingHorizontal: 6,
        },
        pressableParentContainer: {
            width: '100%',
            backgroundColor: 'red',
        },
        notificationInfo: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        leftData: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
            width: '80%',
        },
        image: {
            width: 38,
            height: 38,
            borderRadius: 50,
            marginRight: 8,
            backgroundColor: palette.placeholder,
        },
        textData: {
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100%',
        },
        message: {
            width: '100%',
        },
        content: {
            marginTop: 4,
        },
        time: {
            marginTop: linkTitle ? 4 : 0,
        },
    };
};

export default styles;
