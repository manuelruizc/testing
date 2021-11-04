import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Avatar from 'kwivrr-ui/Avatar';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function Speaker({ speakerObject }) {
    const { speaker, description, topic } = speakerObject;
    const { avatarUrl, email, firstName, lastName, id, isKwivrrUser } = speaker;
    return (
        <View style={{ width: '100%', alignItems: 'center', marginBottom: 28 }}>
            <Avatar
                size={68}
                source={{ uri: imageSourceWithoutCache(avatarUrl) }}
                style={{ marginBottom: 14 }}
            />
            <TextHeader size={18}>{`${firstName} ${lastName}`}</TextHeader>
            <TextHeader style={{ marginTop: 18 }} size={16}>
                {topic}
            </TextHeader>
            <TextRegular
                size={16}
                style={{
                    textAlign: 'center',
                    paddingHorizontal: 22,
                    marginTop: 12,
                }}
            >
                {description}
            </TextRegular>
        </View>
    );
}

Speaker.propTypes = {
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    bio: PropTypes.string.isRequired,
};

export default Speaker;
