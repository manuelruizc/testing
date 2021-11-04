import React, { useMemo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import faker from 'faker';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import TextRegular from 'kwivrr-ui/TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import useDimensions from 'kwivrr-hooks/useDimensions';

function FootageCard({ id }) {
    const classes = useStyles(styles);
    const { screenWidth } = useDimensions();
    const _marginRight = useMemo(() => screenWidth * 0.03, [screenWidth]);
    const marginRight = useMemo(
        () => (id % 2 === 0 ? 0 : _marginRight),
        [_marginRight]
    );
    const uri = faker.image.nature();
    return (
        <View
            style={{
                ...classes.footageCard,
                marginBottom: _marginRight,
                marginRight,
            }}
        >
            <KwivrrImage
                source={{ uri }}
                resizeMode="cover"
                style={classes.footageCardImage}
            />
            <View style={classes.footageInfo}>
                <TextRegular
                    size={10}
                    style={{ width: '75%', marginRight: 6 }}
                    ellipsizeMode="tail"
                    numberOfLines={0}
                >
                    Footage Description
                </TextRegular>
                <View style={classes.footageIcons}>
                    {/* <TouchableOpacity>
                        <KwivrrIcon size={16} name="eye" />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <KwivrrIcon size={16} name="message-square" />
                    </TouchableOpacity> */}
                </View>
            </View>
        </View>
    );
}

export default FootageCard;
