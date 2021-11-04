const styles = () => {
    return {
        container: {
            paddingTop: 50,
            flexDirection: 'row',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 24,
        },
        image: {
            width: 105,
            height: 72,
            borderRadius: 10,
            marginRight: 18,
        },
        rightInfo: {
            alignItems: 'flex-start',
            width: '60%',
        },
        text: {
            marginBottom: 6,
            maxWidth: '100%',
        },
        hostInfo: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        hostName: {
            marginLeft: 6,
        },
    };
};

export default styles;
