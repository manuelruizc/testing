import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import faker from 'faker';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import useDimensions from 'kwivrr-hooks/useDimensions';

function ShoppingCard() {
    const uri = faker.image.food();
    const classes = useStyles(styles);
    const { screenWidth } = useDimensions();
    const marginLeft = useMemo(() => screenWidth * 0.02, [screenWidth]);
    return (
        <View style={{ ...classes.shoppingCard, marginLeft }}>
            <KwivrrImage
                source={{ uri }}
                resizeMode="cover"
                style={classes.shoppingCardImage}
            />
            <View style={classes.shoppingInfo}>
                <TouchableOpacity style={[classes.shoppingButton]}>
                    <TextRegular
                        size={10}
                        color="white"
                        style={{ textTransform: 'uppercase' }}
                    >
                        Buy Now
                    </TextRegular>
                </TouchableOpacity>
                <View style={classes.shoppingIcons}>
                    {/* <TouchableOpacity>
                        <KwivrrIcon
                            style={{ marginRight: 8 }}
                            size={16}
                            name="eye"
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <KwivrrIcon size={16} name="message-square" />
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    );
}

export default ShoppingCard;
