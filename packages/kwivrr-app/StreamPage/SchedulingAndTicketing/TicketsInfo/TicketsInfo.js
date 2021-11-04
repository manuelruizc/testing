import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import { FullWidthTextInput, SmallTextInput } from '../../shared';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { useFormik } from 'formik';
import { TicketsSchema } from './schema';
import Touchable from 'kwivrr-ui/Touchable';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import Tiers from './Tiers/Tiers';
import useTheme from 'kwivrr-hooks/useTheme';
import TextHeader from 'kwivrr-ui/TextHeader';
import moment from 'moment';

function TicketsInfo({ setFieldValue: _setFieldValue, values, handleChange }) {
    const classes = useStyles(styles);
    const { palette } = useTheme();
    const [modal, setModal] = useState(false);

    // useEffect(() => {
    //     _setFieldValue('schedulingAndTicketing.ticketsInfo', values);
    // }, [values]);

    return (
        <React.Fragment>
            <FullWidthTextInput
                value={values.generalTicketDescription}
                onChangeText={handleChange('generalTicketDescription')}
                description
                multiline
                label="General Ticket Description"
                placeholder="General Ticket Details"
            />
            <FullWidthTextInput
                value={values.vipTicketDescription}
                onChangeText={handleChange('vipTicketDescription')}
                description
                multiline
                label="VIP Ticket Description"
                placeholder="VIP Ticket Details"
            />
            <View style={classes.quantitiesContainer}>
                <View style={classes.regularPrice}>
                    <SmallTextInput
                        keyboardType="decimal-pad"
                        onChangeText={handleChange('price')}
                        value={values.price}
                        label="Price"
                        labelSize={12}
                        width={34}
                        placeholder="0"
                    />
                    <KwivrrIcon name="x" size={20} style={classes.icon} />
                    <SmallTextInput
                        keyboardType="decimal-pad"
                        onChangeText={handleChange('quantity')}
                        value={values.quantity}
                        label="Quantity"
                        labelSize={12}
                        width={44}
                        placeholder="0"
                    />
                </View>
                <View style={classes.vipPrice}>
                    <SmallTextInput
                        keyboardType="decimal-pad"
                        onChangeText={handleChange('vipPrice')}
                        value={values.vipPrice}
                        label="VIP price"
                        labelSize={12}
                        width={34}
                        placeholder="0"
                    />
                    <KwivrrIcon name="x" size={20} style={classes.icon} />
                    <SmallTextInput
                        keyboardType="decimal-pad"
                        onChangeText={handleChange('vipQuantity')}
                        value={values.vipQuantity}
                        label="VIP Quantity"
                        labelSize={12}
                        width={44}
                        placeholder="0"
                    />
                </View>
            </View>
            {/* <View style={{ width: '100%', alignItems: 'center' }}>
                {values.tiers.length > 0 &&
                    values.tiers.map((tier, index) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    width: '100%',
                                    alignItems: 'center',
                                    marginBottom:
                                        index === values.tiers.length - 1
                                            ? 0
                                            : 24,
                                }}
                            >
                                <TextHeader
                                    size={16}
                                    style={{ marginBottom: 8 }}
                                >
                                    Tier {index + 1}
                                </TextHeader>
                                <TextRegular>
                                    {moment(tier.scheduledStartTime).format(
                                        'DD/MM/YYYY, h:MM A'
                                    )}{' '}
                                    General: ${tier.price}, VIP: $
                                    {tier.priceVIP}
                                </TextRegular>
                            </View>
                        );
                    })}
            </View> */}
            {/* <View style={{ width: '100%', alignItems: 'center' }}>
                <Touchable onPress={() => setModal(true)}>
                    <TextRegular
                        style={{ paddingLeft: 1, paddingVertical: 18 }}
                    >
                        <KwivrrIcon
                            color={palette.button.primary}
                            name="edit"
                            size={16}
                        />
                        <TextRegular size={16} color={palette.button.primary}>
                            {' '}
                            Edit Price Schedule
                        </TextRegular>
                    </TextRegular>
                </Touchable>
            </View> */}
            {modal && (
                <KwivrrModal
                    title="Price Schedule"
                    absoluteCloseButton
                    usingScrollView={false}
                    close={() => setModal(false)}
                >
                    <Tiers tiers={values.tiers} setFieldValue={setFieldValue} />
                </KwivrrModal>
            )}
        </React.Fragment>
    );
}

export default TicketsInfo;
