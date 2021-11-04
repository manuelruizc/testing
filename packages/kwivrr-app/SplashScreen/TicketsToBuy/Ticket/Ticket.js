import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import AuthButton from 'kwivrr-ui/AuthButton';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';

function Ticket({ title, price, description, isSoldOut, openModal }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            <TextHeader size={18} style={classes.ticketTitle}>
                {title} Ticket
            </TextHeader>
            <TextHeader size={18} style={classes.priceTitle}>
                ${price}
            </TextHeader>
            <TextRegular size={16} style={classes.description}>
                {description}
            </TextRegular>
            <AuthButton
                disabled={isSoldOut}
                backgroundColor={isSoldOut ? '#C9C9C9' : '#3551A1'}
                textColor={isSoldOut ? '#AAAAAA' : 'white'}
                textFontSize={18}
                uppercase={false}
                style={classes.authButtonContainer}
                buttonStyle={classes.authButtonStyle}
                onPress={openModal}
            >
                Buy {title}
            </AuthButton>
        </View>
    );
}

Ticket.propTypes = {
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
};

export default Ticket;
