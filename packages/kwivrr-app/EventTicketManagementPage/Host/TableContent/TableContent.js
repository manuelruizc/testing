import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from '../styles';


function TableContent({ children }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.content}>
            {children}
        </View>
    )
}

TableContent.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
}

export default TableContent;
