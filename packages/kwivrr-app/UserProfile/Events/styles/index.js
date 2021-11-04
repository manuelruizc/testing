const styles = () => {
    return {
        container: {
            width: '100%',
        },
        scrollStyle: {
            flex: 1,
        },
        scrollContent: {
            paddingLeft: 12,
        },
        scrollContentFallback: {
            paddingLeft: 12,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
        },
        noEventsContainer: {
            width: '100%',
            paddingHorizontal: 32,
            paddingVertical: 32,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        label: {
            marginRight: 8,
        },
    };
};

export default styles;
