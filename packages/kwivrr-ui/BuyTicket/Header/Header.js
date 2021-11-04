import React from 'react';
import { Image, View } from 'react-native';
import Avatar from 'kwivrr-ui/Avatar';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrImage from '../../KwivrrImage';
import { defaultDateFormat } from 'kwivrr-common/dateFormats';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function Header({
    hostId,
    avatarUrl,
    eventDate,
    hostName,
    eventImageUrl,
    title,
}) {
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            <KwivrrImage
                source={{
                    uri: imageSourceWithoutCache(eventImageUrl),
                }}
                resizeMode="cover"
                style={classes.image}
                includingKwivrrBackground
            />
            <View style={classes.rightInfo}>
                <TextHeader size={16} numberOfLines={1} style={classes.text}>
                    {title}
                </TextHeader>
                <TextRegular style={classes.text}>
                    {defaultDateFormat(eventDate)}
                </TextRegular>
                <View style={classes.hostInfo}>
                    <Avatar
                        size={22}
                        source={{
                            uri: imageSourceWithoutCache(avatarUrl),
                        }}
                    />
                    <TextRegular style={classes.hostName}>
                        {hostName}
                    </TextRegular>
                </View>
            </View>
        </View>
    );
}

export default Header;
