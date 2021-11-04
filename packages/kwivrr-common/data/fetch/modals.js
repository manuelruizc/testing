import faker from 'faker';
import delayResolve from 'kwivrr-common/delayResolve';

function cancelRefundData() {
    const {
        datatype: { number, boolean },
    } = faker;
    const cardTypes = ['AMX', 'VISA', 'AMX'];
    const creditCardIsZero = boolean();
    const creditCardAmount = number({ min: 2, max: 16 });
    const creditCard = creditCardIsZero ? 0 : creditCardAmount;
    const kwivrrCreditIsZero = boolean();
    const kwivrrCredit =
        kwivrrCreditIsZero && !creditCardIsZero
            ? 0
            : number({
                  min: creditCardIsZero ? 5 : creditCard,
                  max: 20,
              });
    const response = {
        defaultRefundBreakdown: {
            kwivrrCredit: kwivrrCredit,
            creditCard: creditCardIsZero ? 0 : creditCard,
        },
        creditCard: {
            // if creditCard is part of available refund breakdown we want details of card for nicer UX
            last4: number({ min: 1000, max: 9999 }),
            type: cardTypes[number({ min: 0, max: 2 })],
        },
    };
    return response;
}

export async function fetchCancelRefund() {
    return delayResolve(cancelRefundData);
}
