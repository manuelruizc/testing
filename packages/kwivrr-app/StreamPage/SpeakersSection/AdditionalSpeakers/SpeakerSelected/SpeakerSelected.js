import React, { memo } from 'react';
import { View, TouchableOpacity } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import TextHeader from 'kwivrr-ui/TextHeader';
import Avatar from 'kwivrr-ui/Avatar';
import TextRegular from 'kwivrr-ui/TextRegular';
import styles from './styles';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function SpeakerSelected({ speaker, resetSpeaker, idx }) {
    const classes = useStyles(styles);
    const {
        id,
        firstName,
        lastName,
        name,
        isKwivrrUser,
        avatarUrl,
        avatarBase64,
    } = speaker;
    const source = avatarBase64
        ? { uri: 'data:image/png;base64,' + avatarBase64 }
        : avatarUrl.length
        ? { uri: imageSourceWithoutCache(avatarUrl) }
        : undefined;
    const renderName = name ? name : `${firstName} ${lastName}`;
    return (
        <View style={classes.container}>
            <TextHeader style={{ marginRight: 8 }}>{renderName}</TextHeader>
            <View style={classes.imageContainer}>
                <View style={classes.nameInitialContainer}>
                    <TextRegular>{name ? name[0] : firstName[0]}</TextRegular>
                </View>
                <Avatar size={42} source={source} style={classes.avatar} />
            </View>
            <TouchableOpacity onPress={() => resetSpeaker(idx)}>
                <TextRegular color="rgb(0, 120, 255)">Clear</TextRegular>
            </TouchableOpacity>
        </View>
    );
}

export default memo(SpeakerSelected);
