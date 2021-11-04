const styles = ({ palette }) => {
    return {
        body: {
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            marginBottom: 12,
        },
        optionButton: {
            paddingVertical: 12,
            paddingHorizontal: 18,
            borderRadius: 8,
            borderWidth: 1,
            borderColor: palette.button.primary,
        },
    };
};

export default styles;
