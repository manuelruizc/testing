import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import TextRegular from 'kwivrr-ui/TextRegular';
import TextHeader from 'kwivrr-ui/TextHeader';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import ShoppingCard from './ShoppingCard';

function ShoppingSection() {
    const classes = useStyles(styles);
    return (
        <View style={classes.shopping}>
            <View style={{ ...classes.header, paddingHorizontal: 10 }}>
                <TextHeader style={{ textTransform: 'uppercase' }}>
                    Shopping
                </TextHeader>
                <TouchableOpacity>
                    <TextRegular
                        size={12}
                        color={'rgb(211, 105, 99)'}
                        style={{ textTransform: 'uppercase' }}
                    >
                        Access shopping site
                    </TextRegular>
                </TouchableOpacity>
            </View>
            <View style={classes.shopping}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ flex: 1 }}
                >
                    {[0, 0, 0, 0, 0, 0, 0].map((_, idx) => (
                        <ShoppingCard key={idx} />
                    ))}
                </ScrollView>
            </View>
        </View>
    );
}

export default ShoppingSection;
