const styles = ({ palette }) => {
    return {
        container: {
            width: '100%',
            borderWidth: 1,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            borderRadius: 12,
            alignItems: 'center',
            marginBottom: 18,
        },
        headerTitleContainer: {
            paddingVertical: 14,
            paddingHorizontal: 18,
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
        },
        overviewSection: {
            width: '100%',
            paddingHorizontal: 18,
            paddingVertical: 12,
        },
        overviewRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingVertical: 6,
        },
        divider: {
            width: '90%',
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
        },
    };
};

export default styles;
