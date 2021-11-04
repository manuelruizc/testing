const styles = ({ isAndroid }) => {
    return {
        container: {
            width: '100%',
            paddingVertical: isAndroid ? 8 : 12,
            paddingHorizontal: isAndroid ? 8 : 12,
            backgroundColor: 'white',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        touchable: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        avatar: {
            marginRight: 8,
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.1)',
        },
        soldOutText: {
            textTransform: 'uppercase',
        },
    };
};

export default styles;
