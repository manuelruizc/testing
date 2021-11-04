import React from 'react';
import { View } from 'react-native';
import PropTyes from 'prop-types';
import useDimensions from 'kwivrr-hooks/useDimensions';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function EventImage({ eventImage, hasImage }) {
    const { screenHeight } = useDimensions();
    return (
        <View
            style={{
                width: '100%',
                height: screenHeight * 0.32,
                marginTop: 24,
                backgroundColor: 'gray',
            }}
        >
            <KwivrrImage
                source={{ uri: imageSourceWithoutCache(eventImage) }}
                resizeMode="cover"
                style={{ width: '100%', height: '100%' }}
                includingKwivrrBackground
                hasImage={hasImage}
            />
        </View>
    );
}

EventImage.propTypes = {
    eventImage: PropTyes.string.isRequired,
};

export default EventImage;
