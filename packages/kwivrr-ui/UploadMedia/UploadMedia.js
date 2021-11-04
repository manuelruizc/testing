import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import KwivrrIcon from '../KwivrrIcon';
import { mediaTypes } from './utils';

function UploadMedia({
    style = {},
    onPress = {},
    icon = {
        size: 24,
        color: 'black',
        name: 'upload',
    },
    mediaType = 'all',
    onChange = () => {},
}) {
    const [image, setImage] = useState(undefined);
    const [imagePickerResult, setImagePickerResult] = useState(null);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: mediaTypes[mediaType],
            allowsEditing: false,
            //   aspect: [1, 1],
            quality: 1,
            base64: true,
        });

        setImagePickerResult(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    useEffect(() => {
        if (typeof image === undefined) return;
        onChange({ uri: !image ? '' : image });
    }, [image]);

    return (
        <TouchableOpacity onPress={pickImage} style={style}>
            <KwivrrIcon name={icon.name} size={icon.size} color={icon.color} />
        </TouchableOpacity>
    );
}

export default UploadMedia;
