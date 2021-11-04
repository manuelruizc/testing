import React, { useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import useDimensions from 'kwivrr-hooks/useDimensions';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
import InputComponent from 'kwivrr-ui/InputComponent';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrSwitch from 'kwivrr-ui/KwivrrSwitch';
import ProvidersSection from './ProvidersSection';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import useAnimatedClasses from 'kwivrr-hooks/useAnimatedClasses';
import useToast from 'kwivrr-hooks/useToast';
import animatedStyles from './animatedStyles';

const FORMS = [
    {
        name: 'streamTitle',
        type: 'textInput',
        label: 'Title',
        placeholder: 'Stream Title',
    },
    {
        name: 'provider',
        type: 'providerSelection',
        label: 'Provider',
        placeholder: undefined,
    },
    {
        name: 'streamEmbeddedCode',
        type: 'textInput',
        label: 'Stream Embed Code',
        placeholder: undefined,
        _props: {
            autoCapitalize: 'none',
        },
    },
    {
        name: 'private',
        type: 'switch',
        label: 'Private',
        placeholder: undefined,
    },
    // {
    //     name: 'tickets',
    //     type: 'switch',
    //     label: 'Tickets',
    //     placeholder: undefined,
    // },
];

function StreamDetails({ formOptions, detailsActive, setOnLayoutDone }) {
    const classes = useStyles(styles);
    const { screenWidth } = useDimensions();
    const {
        handleChange,
        setFieldValue,
        handleSubmit,
        setFieldTouched,
        errors,
        touched,
        values: formValues,
    } = formOptions;
    const { createToast } = useToast();
    const [layoutDone, setLayoutDone] = useState(false);
    const providerHeight = useSharedValue(0);
    const [totalHeight, setTotalHeight] = useState(0);
    const { detailsStyle } = useAnimatedClasses(
        animatedStyles,
        {
            detailsActive,
            providerHeight,
        },
        { totalHeight, layoutDone, providerActive: formValues.isStream }
    );

    const onLayout = (event) => {
        if (layoutDone) return;
        const { height: _height } = event.nativeEvent.layout;
        setLayoutDone(true);
        runOnJS(setTotalHeight)(_height);
    };

    const onSetEmbeddedCode = async (code) => {
        if (code.length === 0) {
            setFieldValue('provider', '');
            setFieldValue('embedCode', code);
            return;
        }
        const youtubeRegex = new RegExp(
            '^(https?://)?(www.)?(youtube.com|youtu.?be)/.+$'
        );
        const vimeoURL = new RegExp(
            '^(https?://)?(www.|player.)?(vimeo.com)/(?:channels/(?:w+/)?|groups/(?:[^/]*)/videos/|album/(?:d+)/video/|video/|).+$'
        );
        if (vimeoURL.test(code)) {
            setFieldValue('provider', 'vimeo');
        }
        if (youtubeRegex.test(code)) {
            setFieldValue('provider', 'youtube');
        }
        setFieldValue('embedCode', code);
    };

    const setTypeOfEvent = (key, value) => {
        if (key === 'isInPerson' && value) {
            setFieldValue('isStream', false);
        }
        if (key === 'isStream' && value) {
            setFieldValue('isInPerson', false);
        }
        setFieldValue(key, value);
    };

    const onStreamDetailsLayout = (event) => {
        providerHeight.value = event.nativeEvent.layout.height;
    };

    useEffect(() => {
        if (layoutDone) {
            setOnLayoutDone((prev) => ({
                ...prev,
                general: true,
            }));
        }
    }, [layoutDone, setOnLayoutDone]);

    const renderEmbedCode = useMemo(
        () =>
            !(
                formValues.provider === 'Zoom' ||
                formValues.provider === 'kwivrr'
            ),
        [formValues]
    );

    return (
        <Animated.View onLayout={onLayout} style={detailsStyle}>
            <View style={classes.eventTypeSelectorContainer}>
                <KwivrrSwitch
                    style={classes.eventTypeSwitch}
                    labelStyle={classes.eventTypeSwitchLabel}
                    label={'In-Person'}
                    value={formValues.isInPerson}
                    onValueChange={(value) =>
                        setTypeOfEvent(`isInPerson`, value)
                    }
                />
                <KwivrrSwitch
                    style={classes.eventTypeSwitch}
                    label={'Stream'}
                    labelStyle={classes.eventTypeSwitchLabel}
                    value={formValues.isStream}
                    onValueChange={(value) => setTypeOfEvent(`isStream`, value)}
                />
            </View>
            <InputComponent
                value={formValues.title}
                error={errors.title}
                touched={touched.title}
                onChangeText={(text) => setFieldValue('title', text)}
                onBlur={() => setFieldTouched(`title`)}
                style={classes.inputContainer}
                inputStyle={classes.inputStyle}
                labelSize={14}
                label="Title"
                placeholder="Event Title"
                labelColor="black"
            />
            {formValues.isStream && (
                <View onLayout={onStreamDetailsLayout}>
                    <TextRegular style={classes.providerTitle}>
                        Provider
                    </TextRegular>
                    <ProvidersSection
                        providerSelected={formValues.provider}
                        setFieldValue={setFieldValue}
                    />
                    {renderEmbedCode && (
                        <InputComponent
                            value={formValues.embedCode}
                            error={errors.embedCode}
                            touched={touched.embedCode}
                            onChangeText={(text) => onSetEmbeddedCode(text)}
                            onBlur={() => setFieldTouched(`embedCode`)}
                            style={classes.inputContainer}
                            inputStyle={classes.inputStyle}
                            labelSize={14}
                            label="Stream Embed Code"
                            placeholder=""
                            labelColor="black"
                            autoCapitalize="none"
                        />
                    )}
                </View>
            )}
            <KwivrrSwitch
                label="Private"
                value={formValues.isPrivate}
                onValueChange={(value) => setFieldValue('isPrivate', value)}
            />
        </Animated.View>
    );
}

StreamDetails.propTypes = {
    formOptions: PropTypes.shape({
        handleChange: PropTypes.func.isRequired,
        setFieldValue: PropTypes.func.isRequired,
        handleSubmit: PropTypes.func.isRequired,
        values: PropTypes.object.isRequired,
    }),
    detailsActive: PropTypes.any,
};

export default StreamDetails;
