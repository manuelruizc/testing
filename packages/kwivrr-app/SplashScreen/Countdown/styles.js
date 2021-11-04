const styles = ({ palette }) => {
    return {
        container: {
            width: '92%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 18,
            paddingBottom: 24,
        },
        title: {
            marginBottom: 18,
        },
        quantities: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
        },
        numberContainer: {
            alignItems: 'center',
        },
        number: {
            paddingVertical: 12,
            paddingHorizontal: 28,
            borderRadius: 8,
            backgroundColor: palette.placeholder,
        },
        label: {
            marginTop: 4,
            textTransform: 'uppercase',
        },
    };
};

export default styles;
