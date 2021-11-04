import React from 'react';
import { View } from 'react-native';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import { FullWidthTextInput, SmallTextInput } from '../../shared';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { useFormik } from 'formik';
import { TicketsSchema } from './schema';

function TicketsInfo() {
    const classes = useStyles(styles);
    const { values, handleChange } = useFormik({
        initialValues: {
            regularTickets: {
                quantity: '',
                price: '',
            },
            vipTickets: {
                quantity: '',
                price: '',
            },
            generalTicketDescription: '',
            vipTicketDescription: '',
        },
        validationSchema: TicketsSchema,
    });
    return (
        <React.Fragment>
            <View style={classes.quantitiesContainer}>
                <View style={classes.regularPrice}>
                    <SmallTextInput
                        keyboardType="decimal-pad"
                        onChangeText={handleChange('regularTickets.price')}
                        value={values.regularTickets.price}
                        label="Price"
                        labelSize={12}
                        width={34}
                        placeholder="0"
                    />
                    <KwivrrIcon name="x" size={20} style={classes.icon} />
                    <SmallTextInput
                        keyboardType="decimal-pad"
                        onChangeText={handleChange('regularTickets.quantity')}
                        value={values.regularTickets.quantity}
                        label="Quantity"
                        labelSize={12}
                        width={44}
                        placeholder="0"
                    />
                </View>
                <View style={classes.vipPrice}>
                    <SmallTextInput
                        keyboardType="decimal-pad"
                        onChangeText={handleChange('vipTickets.price')}
                        value={values.vipTickets.price}
                        label="VIP price"
                        labelSize={12}
                        width={34}
                        placeholder="0"
                    />
                    <KwivrrIcon name="x" size={20} style={classes.icon} />
                    <SmallTextInput
                        keyboardType="decimal-pad"
                        onChangeText={handleChange('vipTickets.quantity')}
                        value={values.vipTickets.quantity}
                        label="VIP Quantity"
                        labelSize={12}
                        width={44}
                        placeholder="0"
                    />
                </View>
            </View>
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
        </React.Fragment>
    );
}

export default TicketsInfo;
