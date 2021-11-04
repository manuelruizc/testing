const styles = ({ OS }) => {
    return {
        modal: {
            height: OS === 'android' ? '55%' : '50%',
            paddingVertical: 18,
            zIndex: 1000000,
        },
        modalWithoutImage: {
            height: OS === 'android' ? '35%' : '32%',
            paddingVertical: 18,
            zIndex: 1000000,
        },
        modalInner: {
            flex: 1,
            width: '100%',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        modalContainer: {
            alignItems: 'center',
            paddingVertical: 24,
        },
        topInfoContainer: {
            alignItems: 'center',
        },
        image: {
            width: 180,
            height: 120,
            borderRadius: 18,
            marginBottom: 16,
        },
        eventName: {
            marginBottom: 6,
        },
        socialContainer: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            marginBottom: 8,
            paddingVertical: 28,
            paddingBottom: 18,
        },
        moreOptions: {
            marginBottom: 18,
        },
        socialIcon: {
            width: 48,
            height: 48,
            borderRadius: 10,
        },
    };
};

export default styles;
