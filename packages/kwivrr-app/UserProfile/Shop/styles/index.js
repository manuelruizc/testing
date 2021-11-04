const styles = () => {
    return {
        container: {
            width: '100%',
            flex: 1,
        },
        scrollStyle: {
            flex: 1,
        },
        fallbackContainer: {
            width: '100%',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 12,
        },
        emptyState: {
            width: '100%',
            paddingHorizontal: 32,
            paddingVertical: 32,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start',
        },
        scrollContent: {
            paddingLeft: 12,
        },
    };
};

export default styles;
