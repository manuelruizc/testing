import React, { memo, useState, useEffect } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
import TextRegular from 'kwivrr-ui/TextRegular';
import Avatar, { AvatarSelectMedia } from 'kwivrr-ui/Avatar';
import InputComponent from 'kwivrr-ui/InputComponent';
import { FullWidthTextInput } from '../shared';
import Select from 'kwivrr-ui/Select/Select';
import UploadMediaWithOptions from 'kwivrr-ui/UploadMediaWithOptions/UploadMediaWithOptions';
import useAnimatedClasses from 'kwivrr-hooks/useAnimatedClasses';
import animatedStyles from './animatedStyles';
import EventGroups from './EventGroups';
import SelectCoverMedia from 'kwivrr-ui/SelectCoverMedia';

const LANGUAGES_SUPPORTED = [
    { label: 'English', value: 'en' },
    { label: 'Español', value: 'es' },
    { label: 'Français', value: 'fr' },
    { label: 'Italiano', value: 'it' },
    { label: 'Dutch', value: 'dea' },
    { label: 'German', value: 'de' },
    { label: 'Mandarin', value: 'ma' },
    { label: 'Japanese', value: 'ja' },
    { label: 'Portuguese', value: 'pt' },
];

function AdvancedDetails({
    formOptions,
    advancedActive,
    addNewSpeaker: setSpeaker,
    editSpeakerField,
    openCreateSpeakerModal,
    setOnLayoutDone,
}) {
    const classes = useStyles(styles);
    const {
        handleChange,
        setFieldValue,
        setFieldTouched,
        handleSubmit,
        errors,
        touched,
        values: formValues,
    } = formOptions;

    const [layoutDone, setLayoutDone] = useState(false);
    const [totalHeight, setTotalHeight] = useState(0);
    const [imageSource, setImageSource] = useState('');
    const storeLinkHeight = useSharedValue(0);
    const newSpeakerHeight = useSharedValue(0);

    const addNewSpeaker = () => {
        setSpeaker({
            speaker: {
                username: '',
                name: '',
                about: '',
                picture: '',
            },
            topic: '',
            description: '',
            startTime: '',
            endTime: '',
        });
    };

    const onLayout = (event) => {
        if (layoutDone) return;
        const { height: _height } = event.nativeEvent.layout;
        setLayoutDone(true);
        runOnJS(setTotalHeight)(_height);
    };

    const onLayoutNewSpeaker = (event) => {
        'worklet';
        newSpeakerHeight.value = event.nativeEvent.layout.height;
    };

    const { advancedStyle } = useAnimatedClasses(
        animatedStyles,
        {
            newSpeakerHeight,
            advancedActive,
            storeLinkHeight,
        },
        {
            layoutDone,
            totalHeight,
            storeActive: !formValues.isInPerson && formValues.isStream,
        }
    );

    const onStoreLayout = (event) => {
        storeLinkHeight.value = event.nativeEvent.layout.height;
    };

    useEffect(() => {
        if (formValues.coverUrl.hasImage) {
            setImageSource(formValues.coverUrl.imageUrlFromServer);
        }
    }, []);

    useEffect(() => {
        if (layoutDone) {
            setOnLayoutDone((prev) => ({
                ...prev,
                advanced: true,
            }));
        }
    }, [layoutDone, setOnLayoutDone]);

    useEffect(() => {
        const { coverUrl } = formValues;
        if (
            coverUrl.base64 === '' &&
            coverUrl.url === '' &&
            coverUrl.source === '' &&
            coverUrl.itChanged
        ) {
            setImageSource('');
        }
    }, [formValues.coverUrl, setImageSource]);

    return (
        <>
            <Animated.View onLayout={onLayout} style={advancedStyle}>
                <View style={classes.coverImageContainer}>
                    <TextRegular>Cover Image or Video</TextRegular>
                    <SelectCoverMedia
                        // onPress={() => setFieldValue('coverUrl', '')}
                        // source={{ uri: formValues.coverUrl }}
                        // uri={formValues.coverUrl}
                        size={120}
                        source={
                            imageSource
                                ? imageSource.length > 0
                                    ? { uri: imageSource }
                                    : null
                                : null
                        }
                        onChange={(imageObject) => {
                            if (imageObject === null || !imageObject) return;
                            const { uri } = imageObject;
                            if (!uri) return;
                            const { base64 } = uri;
                            if (!base64) return;
                            setFieldValue('coverUrl.itChanged', true);
                            setFieldValue('coverUrl.base64', base64);
                            setFieldValue('coverUrl.url', '');
                            setFieldValue('coverUrl.source', 'base64');
                            setImageSource(uri.uri);
                        }}
                        imageStyle={{
                            borderRadius: 8,
                        }}
                        style={{ width: '100%', height: 240 }}
                    />
                </View>
                {/* <View style={classes.coverUrlContainer}>
                    <InputComponent
                        value={formValues.coverUrl.url}
                        onChangeText={(text) => {
                            setFieldValue('coverUrl.source', 'url');
                            setFieldValue('coverUrl.url', text);
                            setFieldValue('coverUrl.base64', '');
                            setImageSource(text);
                        }}
                        style={{ width: '80%' }}
                        placeholder="Cover URL"
                        inputStyle={{ ...classes.inputStyle, marginBottom: 0 }}
                        labelSize={14}
                        labelColor="black"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <View style={classes.verticalDivider} />
                    <UploadMediaWithOptions
                        onChange={(imageObject) => {
                            if (!imageObject || imageObject === null) return;
                            const { uri, base64 } = imageObject;
                            setFieldValue('coverUrl.base64', base64);
                            setFieldValue('coverUrl.url', '');
                            setFieldValue('coverUrl.source', 'base64');
                            setImageSource(uri);
                        }}
                        style={classes.uploadButton}
                        size={34}
                        icon={{ name: 'upload', color: 'white', size: 20 }}
                    />
                </View> */}
                <View style={classes.inputsContainer}>
                    <FullWidthTextInput
                        value={formValues.description}
                        placeholder={`Stream Title & Description`}
                        label="Description"
                        error={errors.description}
                        touched={touched.description}
                        onChangeText={handleChange('description')}
                        multiline
                        inputStyle={{ ...classes.inputStyleDescription }}
                    />
                    <FullWidthTextInput
                        value={formValues.disclaimer}
                        placeholder="Disclaimer"
                        label="Disclaimer"
                        error={errors.disclaimer}
                        touched={touched.disclaimer}
                        onChangeText={handleChange('disclaimer')}
                        multiline
                        inputStyle={{ ...classes.inputStyleDescription }}
                    />
                    <View onLayout={onStoreLayout}>
                        {!formValues.isInPerson && formValues.isStream && (
                            <FullWidthTextInput
                                value={formValues.shopLink}
                                placeholder="Shop URL"
                                label="Shop Link"
                                error={errors.shopLink}
                                touched={touched.shopLink}
                                onChangeText={handleChange('shopLink')}
                            />
                        )}
                    </View>
                    <Select
                        multiple={true}
                        listMode="SCROLLVIEW"
                        scrollViewProps={{
                            nestedScrollEnabled: true,
                        }}
                        min={0}
                        max={10}
                        value={formValues.languagesSupported}
                        style={{
                            ...classes.inputStyle,
                            borderWidth: 0,
                            marginBottom: 12,
                        }}
                        options={LANGUAGES_SUPPORTED}
                        dropDownDirection="TOP"
                        mode="BADGE"
                        showBadgeDot={false}
                        label="Languages Supported"
                        placeholder="No languages selected"
                        placeholderStyle={{
                            color: 'rgba(0, 0, 0, 0.2)',
                            fontSize: 15,
                            fontFamily: 'Rubik-Light',
                        }}
                        onChange={(value) =>
                            setFieldValue('languagesSupported', value)
                        }
                    />
                    {/* <EventGroups setFieldValue={setFieldValue} /> */}
                    {/* <SharedSwitch
                        value={formValues.eventCountDown}
                        label="Event Countdown"
                        onValueChange={(value) =>
                            setFieldValue('eventCountDown', value)
                        }
                    /> */}
                </View>
                {/* {formValues.speakers.length > 0 && (
                    <View
                        onLayout={onLayoutNewSpeaker}
                        style={classes.additionalSpeakers}
                    >
                        <AdditionalSpeakers
                            openCreateSpeakerModal={openCreateSpeakerModal}
                            removeSpeaker={removeSpeaker}
                            resetSpeakerInfo={resetSpeakerInfo}
                            editSpeakerField={editSpeakerField}
                            additionalSpeakers={formValues.speakers}
                        />
                    </View>
                )}
                <View style={classes.addNewSpeakerContainer}>
                    <TouchableOpacity onPress={addNewSpeaker}>
                        <TextRegular size={16} color="#6478B8">
                            + Add Additional Speaker
                        </TextRegular>
                    </TouchableOpacity>
                </View>
                <View style={classes.saveStream}>
                    <TextRegular size={16} color="#6478B8">
                        Save Stream
                    </TextRegular>
                </View> */}
            </Animated.View>
        </>
    );
}

AdvancedDetails.propTypes = {};

export default memo(AdvancedDetails);
