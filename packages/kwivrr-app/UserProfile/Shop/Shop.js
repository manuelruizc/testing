import React, { useEffect, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import EventCard from '../EventCard';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import ShoppingCard from '../ShoppingCard';
import TextRegular from 'kwivrr-ui/TextRegular';

function Shop({ shopItems, setShopItems, apiShopItems, isCurrentUser }) {
    const classes = useStyles(styles);
    const scrollViewRef = useRef(null);

    useEffect(() => {
        setShopItems([...apiShopItems]);
    }, []);

    return (
        <View style={classes.container}>
            {shopItems.length === 0 ? (
                <View style={classes.emptyState}>
                    <TextRegular size={18}>You have no items</TextRegular>
                </View>
            ) : (
                <ScrollView
                    ref={scrollViewRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={classes.scrollStyle}
                    contentContainerStyle={classes.scrollContent}
                >
                    {shopItems.map((article, idx) => {
                        // pass article to component
                        return (
                            <ShoppingCard
                                setShopItems={setShopItems}
                                isCurrentUser={isCurrentUser}
                                key={idx}
                                article={article}
                            />
                        );
                    })}
                </ScrollView>
            )}
        </View>
    );
}
export default Shop;
