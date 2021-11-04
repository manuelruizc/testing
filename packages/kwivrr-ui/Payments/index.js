import useQuery from 'kwivrr-hooks/useQuery';
import React, { useMemo } from 'react';
import ResultQuery from '../ResultQuery';
import Payments from './Payments';

const convertToPaymentsOptions = (payments, paymentType = 'default') => {
    const isDefault = paymentType === 'default';
    const { credit_cards, echecks: _echecks } = payments;
    const cards = convertToPaymentsObject(credit_cards.data, 'card');
    const echecks = convertToPaymentsObject(_echecks.data, 'echecks');
    return [...cards, ...echecks];
};

const convertToPaymentsObject = (payments, paymentType) => {
    const isCard = paymentType === 'card';
    return payments.map(
        ({
            attributes: {
                card_type,
                default: defaultOption,
                last_four,
                account_holder_name,
                routing_number,
                provider,
                external_id,
                title,
            },
            id,
        }) => {
            if (paymentType === 'payment') {
                return {
                    id,
                    last4: external_id,
                    brand: provider,
                    defaultOption,
                    paymentType,
                };
            }
            return {
                id,
                last4: isCard ? last_four : routing_number.substr(-4),
                [isCard ? 'brand' : 'accountHolder']: isCard
                    ? card_type
                    : account_holder_name,
                paymentType,
                defaultOption: defaultOption,
            };
        }
    );
};

export default function ({ type = 'card', ...rest }) {
    const queryKey = useMemo(() =>
        type === 'default'
            ? 'getPaymentChoices'
            : type === 'echecks'
            ? 'getDefaultEChecks'
            : 'getDefaultPayoutMethods'
    );
    const query = useQuery(queryKey, { userId: 'me', id: 'me' });
    return (
        <ResultQuery
            query={query}
            Success={Payments}
            normalizeProps={(p) => {
                return {
                    ...p,
                    apiPayments:
                        type === 'default'
                            ? convertToPaymentsOptions(p.data.data, type)
                            : convertToPaymentsObject(p.data.data, type),
                };
            }}
            {...rest}
        />
    );
}
