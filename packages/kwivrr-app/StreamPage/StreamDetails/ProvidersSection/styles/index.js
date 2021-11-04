const styles = ({ screenWidth, providerSelected }) => {
    return {
        container: {
            width: '100%',
            flexDirection: 'row',
            justifyContent: providerSelected.length
                ? 'flex-start'
                : 'space-between',
            alignItems: 'center',
            marginBottom: 18,
        },
        clear: {
            marginRight: 28,
        },
        providerItem: {
            width: screenWidth * 0.14,
            height: screenWidth * 0.14,
            borderRadius: screenWidth * 0.14,
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden',
        },
        providerItemKwivrr: {
            width: screenWidth * 0.1,
            height: screenWidth * 0.1,
            borderRadius: 0,
        },
        image: {
            width: '100%',
            height: '100%',
        },
    };
};

export default styles;
