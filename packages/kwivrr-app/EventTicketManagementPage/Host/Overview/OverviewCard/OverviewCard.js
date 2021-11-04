import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import TextHeader from 'kwivrr-ui/TextHeader';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Divider from 'kwivrr-ui/Divider';
import TextRegular from 'kwivrr-ui/TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import BankingInformation from 'kwivrr-ui/BankingInformation/BankingInformation';

function OverviewCard({
    type = 'Revenue',
    title = 'Revenue',
    generalTickets = 750,
    vipTickets = 200,
    info,
}) {
    const {
        ga_tickets_total_sales: gaTicketsTotalSales = '0.0',
        vip_tickets_total_sales: vipTicketsTotalSales = '0.0',
        ga_tickets_sold: gaTicketsSold = 0,
        vip_tickets_sold: vipTicketsSold = 0,
        ga_tickets_checked_in_count: gaTicketsCheckedInCount = 0,
        vip_tickets_checked_in_count: vipTicketsCheckedInCount = 0,
        ga_tickets_allocated: gaTicketsAllocated = 100,
        vip_tickets_allocated: vipTicketsAllocated = 100,
    } = info;
    const [openModal, setOpenModal] = useState(false);
    const [selectedPaymentOption, setSelectedPaymentOption] = useState({
        brand: 'cashapp',
        defaultOption: false,
        handler: 'meganhendricks',
        id: 11239123,
        paymentType: 'online',
        type: 'username',
    });
    const isRevenue = useMemo(() => type === 'Revenue', [type]);
    const headerQuantity = useMemo(() => {
        if (isRevenue)
            return (
                '$' +
                (
                    Number(gaTicketsTotalSales) + Number(vipTicketsTotalSales)
                ).toFixed(2)
            );
        return (
            gaTicketsCheckedInCount +
            vipTicketsCheckedInCount +
            '/' +
            (gaTicketsSold + vipTicketsSold)
        );
    }, [
        isRevenue,
        gaTicketsTotalSales,
        vipTicketsTotalSales,
        gaTicketsCheckedInCount,
        vipTicketsCheckedInCount,
        gaTicketsAllocated,
        vipTicketsAllocated,
    ]);
    const bodyInfo = useMemo(() => {
        if (isRevenue)
            return {
                ga: '$' + Number(gaTicketsTotalSales).toFixed(2),
                vip: '$' + Number(vipTicketsTotalSales).toFixed(2),
            };
        return {
            ga: gaTicketsCheckedInCount + '/' + gaTicketsSold,
            vip: vipTicketsCheckedInCount + '/' + vipTicketsSold,
        };
    }, [isRevenue]);
    const classes = useStyles(styles);
    const { palette } = useTheme();
    return (
        <React.Fragment>
            <View style={classes.container}>
                <View style={classes.headerTitleContainer}>
                    <TextHeader size={16}>{title}</TextHeader>
                    <TextHeader size={16}>{headerQuantity}</TextHeader>
                </View>
                <Divider style={classes.divider} />
                <View style={classes.overviewSection}>
                    <View style={classes.overviewRow}>
                        <TextHeader size={16}>General</TextHeader>
                        <TextHeader size={16}>{bodyInfo.ga}</TextHeader>
                    </View>
                    {vipTicketsAllocated > 0 && (
                        <View style={classes.overviewRow}>
                            <TextHeader size={16}>VIP</TextHeader>
                            <TextHeader size={16}>{bodyInfo.vip}</TextHeader>
                        </View>
                    )}
                </View>
                {/* {type === 'Revenue' && (
                    <View style={classes.overviewRow}>
                        <TextRegular
                            style={{
                                justifyContent: 'center',
                                textAlign: 'center',
                                width: '100%',
                            }}
                        >
                            Payment Expected 04/06/2021 to{' '}
                            <TouchableOpacity
                                onPress={() => setOpenModal(true)}
                            >
                                <TextRegular
                                    size={12}
                                    color={palette.button.primary}
                                >
                                    {selectedPaymentOption.brand[0].toUpperCase() +
                                        selectedPaymentOption.brand.substr(
                                            1
                                        )}{' '}
                                    <KwivrrIcon
                                        name="share"
                                        size={12}
                                        color={palette.button.primary}
                                    />
                                </TextRegular>
                            </TouchableOpacity>
                        </TextRegular>
                    </View>
                )} */}
            </View>
            {openModal && (
                <KwivrrModal
                    absoluteCloseButton
                    usingScrollView={false}
                    title={'Banking Information'}
                    close={() => setOpenModal(false)}
                >
                    <BankingInformation
                        getAccounts
                        onSelect={(option) => setSelectedPaymentOption(option)}
                        deleteOption={false}
                        addAccountLocally
                        selected={selectedPaymentOption.id}
                    />
                </KwivrrModal>
            )}
        </React.Fragment>
    );
}

export default OverviewCard;
