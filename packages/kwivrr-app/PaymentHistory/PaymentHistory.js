import React, { useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import SettingsLayout from 'kwivrr-ui/SettingsLayout/SettingsLayout';
import TextHeader from 'kwivrr-ui/TextHeader';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import LoadingUI from 'kwivrr-ui/LoadingUI';
import Filters from './Filters/Filters';
import PaymentCard from './PaymentCard/PaymentCard';
import faker from 'faker';

const filteringOptions = [
    { label: 'All', value: 'all' },
    { label: 'Paid', value: 'paid' },
    { label: 'Pending', value: 'pending' },
];

const _payments = [
    {
        id: 151234123,
        title: faker.company.companyName(),
        eventDate: '03/03/2021, 4:00 PM',
        status: 'Paid',
        amount: Number(2500).toFixed(2),
        handler: 'meganhendricks',
        accountType: 'online',
        accountCompany: 'venmo',
        paymentDate: '03/09/2021, 12:00 PM',
    },
    {
        id: 1123123,
        title: faker.company.companyName(),
        eventDate: '04/04/2021, 5:00 PM',
        status: 'Pending',
        amount: Number(2500).toFixed(2),
        handler: 'meganhendricks',
        accountType: 'online',
        accountCompany: 'venmo',
        paymentDate: null,
    },
];

function PaymentHistory({ navigation }) {
    const classes = useStyles(styles);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [payments, setPayments] = useState(null);

    useEffect(() => {
        setTimeout(() => {
            setPayments(_payments);
        }, 1000);
    }, []);

    if (!payments) {
        return (
            <SettingsLayout onPress={navigation.goBack}>
                <View style={{ flex: 1 }}>
                    <LoadingUI />
                </View>
            </SettingsLayout>
        );
    }

    return (
        <SettingsLayout onPress={navigation.goBack}>
            <TextHeader size={18}>Payment History</TextHeader>
            <Filters
                options={filteringOptions}
                filter={filter}
                setFilter={setFilter}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={classes.scrollView}
                contentContainerStyle={classes.contentContainer}
            >
                {payments.map((payment, index) => (
                    <PaymentCard key={index} payment={payment} />
                ))}
            </ScrollView>
        </SettingsLayout>
    );
}

export default PaymentHistory;
