import React, { useState } from 'react';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';
import TextRegular from 'kwivrr-ui/TextRegular/TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import InputComponent from 'kwivrr-ui/InputComponent';
import AuthButton from 'kwivrr-ui/AuthButton';
import { useFormik } from 'formik';
import { TransferEmailSchema } from './schema';
import useActions from 'kwivrr-hooks/useActions';

function TransferTicket({ closeModal, ticketId, ticket, eventId, refetch }) {
    const classes = useStyles(styles);
    const { onTransferTicket } = useActions();
    const [loading, setLoading] = useState(false);
    const { values, errors, touched, handleSubmit, handleBlur, handleChange } =
        useFormik({
            initialValues: {
                email: '',
            },
            validationSchema: TransferEmailSchema,
            onSubmit: async (submittedValues) => {
                try {
                    setLoading(true);
                    console.log({
                        id: ticketId,
                        email: submittedValues.email,
                        eventId,
                    });
                    const response = await onTransferTicket({
                        id: ticketId,
                        email: submittedValues.email,
                    });
                    if (refetch) {
                        await refetch();
                    }
                    Alert.alert('Your ticket has been transferred', '', [
                        { onPress: closeModal },
                    ]);
                    setLoading(false);
                    // closeModal();
                } catch (e) {
                    Alert.alert('Error on Ticket transfer');
                    console.log(e);
                    setLoading(false);
                }
            },
        });
    return (
        <>
            <TextRegular style={classes.subTitle} size={18}>
                Ticket ID #: {ticketId}
            </TextRegular>
            <InputComponent
                autoCapitalize="none"
                label="Transfer To"
                labelSize={16}
                value={values.email}
                error={errors.email}
                touched={touched.email}
                onBlur={handleBlur('email')}
                onChangeText={handleChange('email')}
                placeholder="Email"
                style={{ width: '80%', marginTop: 24 }}
                inputStyle={classes.inputStyle}
            />
            <AuthButton
                backgroundColor="#3551A1"
                buttonStyle={classes.buttonStyle}
                textFontSize={18}
                uppercase={false}
                textColor="white"
                onPress={handleSubmit}
                isLoading={loading}
                activityIndicatorColor="white"
            >
                Transfer Ticket
            </AuthButton>
            <TextRegular style={classes.cancel} onPress={closeModal}>
                Cancel
            </TextRegular>
        </>
    );
}

TransferTicket.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default TransferTicket;
