const styles = ({ palette }) => {
    return {
        topOptions: {
            width: '100%',
            paddingVertical: 18,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 8,
        },
        option: {
            paddingVertical: 8,
            paddingHorizontal: 8,
            borderWidth: 1,
            borderColor: palette.button.primary,
            borderRadius: 8,
        },
    };
};

export default styles;
