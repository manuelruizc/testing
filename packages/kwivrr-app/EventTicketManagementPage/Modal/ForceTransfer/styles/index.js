const styles = ({ screenHeight }) => {
    return {
        inputStyle: {
            width: '100%',
            height: screenHeight * 0.045,
            backgroundColor: 'rgba(235, 235, 235, 0.5)',
            borderRadius: 8,
            marginBottom: 0,
            paddingHorizontal: 14,
            fontSize: 16
        },
        buttonStyle: {
            width: 'auto', 
            paddingHorizontal: 24, 
            paddingVertical: 12,
            marginTop: 24
        },
        cancel: {
            marginVertical: 24
        }
    }
}

export default styles;
