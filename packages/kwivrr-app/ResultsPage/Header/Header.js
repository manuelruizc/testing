import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import TextHeader from 'kwivrr-ui/TextHeader';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';

function Header({ title }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            <TextHeader size={19}>{title}</TextHeader>
        </View>
    );
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
};

export default Header;
