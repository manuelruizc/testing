import React from 'react';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';

function ShoppingCardFallback() {
    const classes = useStyles(styles);
    const { palette } = useTheme();
    return (
        <View style={classes.fallbackCard}>
            <View style={classes.cardImage} />
            <View style={classes.cardFooter}>
                <View style={classes.topInfo} />
                <View style={classes.shopBottomInfo}>
                    <TextRegular></TextRegular>
                    <View
                        style={[classes.viewOnWebsiteButton, { opacity: 0 }]}
                    />
                </View>
            </View>
        </View>
    );
}

export default ShoppingCardFallback;
