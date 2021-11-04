import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import faker from 'faker';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import useTheme from 'kwivrr-hooks/useTheme';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function PaymentCard({
    payment: {
        id,
        title,
        eventDate,
        status,
        amount,
        handler,
        accountType,
        accountCompany,
        paymentDate,
    },
}) {
    const classes = useStyles(styles);
    const { palette } = useTheme();
    const { userInfo } = useAuthCredentials();
    return (
        <View style={classes.container}>
            <View style={classes.topInfo}>
                <KwivrrImage
                    source={{
                        uri: imageSourceWithoutCache(faker.image.nature()),
                    }}
                    resizeMode="cover"
                    style={classes.eventImage}
                />
                <View style={classes.eventInfo}>
                    <TextHeader
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        size={16}
                        style={classes.title}
                    >
                        {title}
                    </TextHeader>
                    <TextRegular size={16}>{eventDate}</TextRegular>
                </View>
            </View>
            <View style={classes.paymentStatus}>
                <View style={classes.paymentStatusInfo}>
                    <TextHeader
                        color={status === 'Paid' && 'green'}
                        size={16}
                        style={classes.status}
                    >
                        {status}
                    </TextHeader>
                    <TextRegular size={16}>${amount}</TextRegular>
                </View>
                {status === 'Paid' && <TextRegular>{paymentDate}</TextRegular>}
            </View>
            <View style={classes.paymentAccount}>
                <KwivrrImage
                    source={{
                        uri: 'https://global-uploads.webflow.com/5f4dd3623430990e705ccbba/5f7f7f2d126b05512021cf9b_app-icon.original.png',
                    }}
                    resizeMode="cover"
                    style={classes.paymentAccountLogo}
                />
                <TextRegular style={classes.handler} size={16}>
                    @{'userInfo.email'}
                </TextRegular>
                <TouchableOpacity>
                    <KwivrrIcon color={palette.button.primary} name="edit" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default PaymentCard;
