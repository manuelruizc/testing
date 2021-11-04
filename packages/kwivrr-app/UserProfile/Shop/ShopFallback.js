import React from 'react';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import ShoppingCardFallback from '../ShoppingCard/ShopingCardFallback';

function ShopFallback() {
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            <View
                style={classes.fallbackContainer}
                contentContainerStyle={classes.scrollContent}
            >
                {new Array(3).fill(null).map((_, idx) => {
                    // pass article to component
                    return <ShoppingCardFallback key={idx} />;
                })}
            </View>
        </View>
    );
}
export default ShopFallback;
