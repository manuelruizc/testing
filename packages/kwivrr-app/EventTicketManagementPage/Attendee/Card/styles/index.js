const styles = () => {
    return {
        container: {
            width: '90%',
            borderWidth: 1,
            borderRadius: 8,
            borderColor: 'rgba(0, 0, 0, 0.2)',
            justifyContent: 'flex-start',
            alignItems: 'center',
            marginVertical: 12
        },
        header: {
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 18,
            paddingVertical: 10,
            paddingBottom: 2
        },
        infoContainer: {
            width: '100%',
            paddingHorizontal: 18
        },
        actions: {
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center',
            width: '50%',
        },
        action: {
            marginLeft: 10
        },
        ticketInfo: {
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            marginBottom: 12
        },
        ticketInfoTitle: {
            marginBottom: 0
        },
        ticketStatusTitle: {
            marginBottom: 8
        },
        ticketStatus: {
            marginBottom: 4,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-start'
        },
        divider: {
            width: '92%',
            marginVertical: 8
        },
        expandArrow: {
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 6,
            marginTop: 12
        },
        receiptContainer: {
            marginTop: 12,
            width: '100%', 
            paddingHorizontal: 18
        },
        paymentDetails: {
            marginTop: 12,
            width: '100%', 
            paddingHorizontal: 18
        },
        paymentDetailsRow: {
            marginBottom: 4
        },
        receiptInfoRow: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
        },
    }
}

export default styles;
