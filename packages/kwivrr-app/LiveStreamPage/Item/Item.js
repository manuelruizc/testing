import React, { memo } from 'react';
import { Image, View } from 'react-native';
import PropTypes from 'prop-types';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import {
    defaultDateFormat,
    defaultTimeFormat,
} from 'kwivrr-common/dateFormats';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function Item({ item }) {
    const { avatarUrl, commentText, commenter, dateCommented, id } = item;
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            <KwivrrImage
                source={{
                    uri: imageSourceWithoutCache(avatarUrl),
                }}
                resizeMode="cover"
                style={classes.image}
            />
            <View style={classes.commentInfo}>
                <View style={classes.commentContainer}>
                    <TextRegular size={12} color="black">
                        {commenter} <TextHeader color="black">·</TextHeader>{' '}
                        {defaultTimeFormat(dateCommented)}
                    </TextRegular>
                </View>
                <TextHeader color="black">{commentText}</TextHeader>
            </View>
        </View>
    );
}

Item.propTypes = {
    item: PropTypes.object.isRequired,
};

export default memo(Item);
