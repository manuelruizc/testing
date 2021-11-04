import React, { useMemo } from 'react';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import TextRegular from 'kwivrr-ui/TextRegular';
import useConfirmModal from 'kwivrr-hooks/useConfirmModal';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

const cardLogos = {
    mastercard:
        'https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png',
    visa: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png',
    american:
        'data:image/png;base64,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',
};

const bankLogos = {
    ['bank of america']:
        'http://assets.stickpng.com/thumbs/5842f0a9a6515b1e0ad75b18.png',
    ['chase bank']:
        'https://pbs.twimg.com/profile_images/991359355017613313/g3PdBmwr_400x400.jpg',
    ['us bank']:
        'https://logos-marcas.com/wp-content/uploads/2021/02/US-Bank-Logo.png',
    ['wells fargo']:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Wells_Fargo_Bank.svg/768px-Wells_Fargo_Bank.svg.png',
};

const paymentLogos = {
    venmo: 'https://img1.freepng.es/20180418/cie/kisspng-venmo-money-payment-square-cash-paypal-5ad71dd1ecb0b7.8007833515240473139695.jpg',
    cashapp:
        'https://www.tiendadeapps.com/wp-content/uploads/2020/04/cash-app.png',
};

function Payment({
    paymentOption: {
        last4,
        paymentType,
        handler,
        brand,
        defaultOption,
        id,
        type,
    },
    deletePaymentOption,
    index,
}) {
    const classes = useStyles(styles);
    const { openConfirmModal } = useConfirmModal();
    const { userInfo } = useAuthCredentials();
    const deleteItem = () => {
        openConfirmModal(
            [
                'Are you sure you want to delete this payment option?',
                'Cancel',
                'Delete Payment Option',
            ],
            deletePaymentOption,
            [index, id, paymentType]
        );
    };
    const logoUrl = useMemo(() => {
        if (paymentType === 'card') return cardLogos[brand];
        if (paymentType === 'bank') return bankLogos[brand.toLowerCase()];
        return paymentLogos[brand];
    }, [paymentType, brand]);

    return (
        <View style={classes.container}>
            <View style={classes.paymentContainer}>
                <View style={classes.touchablePayment}>
                    <TouchableOpacity
                        // onPress={() => alert('aaa')}
                        style={classes.touchableOpacity}
                    >
                        <View style={classes.paymentContent}>
                            <View style={classes.cardInfo}>
                                <KwivrrImage
                                    source={{
                                        uri: imageSourceWithoutCache(logoUrl),
                                    }}
                                    style={classes.bankLogo}
                                    resizeMode="contain"
                                />
                                {last4 && (
                                    <TextRegular size={16}>{last4}</TextRegular>
                                )}
                                {handler && (
                                    <TextRegular size={16}>
                                        {type === 'username'
                                            ? `@${userInfo.email.split('.')[0]}`
                                            : handler}
                                    </TextRegular>
                                )}
                            </View>
                            {defaultOption && (
                                <View style={classes.defaultLabel}>
                                    <TextRegular
                                        size={16}
                                        style={classes.defaultLabelText}
                                        color="rgba(0, 0, 0, 0.5)"
                                    >
                                        Default
                                    </TextRegular>
                                    <KwivrrIcon
                                        name="check"
                                        color="#55D38D"
                                        size={20}
                                    />
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity onPress={deleteItem}>
                <View style={classes.deleteButton}>
                    <KwivrrIcon name="x" color="tomato" />
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default Payment;
