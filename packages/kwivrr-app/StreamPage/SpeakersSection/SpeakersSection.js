import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
import useAnimatedClasses from 'kwivrr-hooks/useAnimatedClasses';
import animatedStyles from './animatedStyles';
import AdditionalSpeakers from './AdditionalSpeakers';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';

function SpeakersSection({
    active,
    formOptions,
    openCreateSpeakerModal,
    editSpeakerField,
    addNewSpeaker: setSpeaker,
}) {
    const {
        handleChange,
        setFieldValue,
        handleSubmit,
        setFieldTouched,
        errors,
        touched,
        values: { speakers: formValues },
    } = formOptions;

    const classes = useStyles(styles);
    const [layoutDone, setLayoutDone] = useState(false);
    const newSpeakerHeight = useSharedValue(0);
    const [totalHeight, setTotalHeight] = useState(0);
    const { style } = useAnimatedClasses(
        animatedStyles,
        { active, newSpeakerHeight },
        { totalHeight, layoutDone }
    );
    const onLayout = (event) => {
        if (layoutDone) return;
        const { height: _height } = event.nativeEvent.layout;
        runOnJS(setLayoutDone)(true);
        runOnJS(setTotalHeight)(_height);
    };

    const removeSpeaker = (idx) => {
        let newSpeakers = formValues;
        newSpeakers = newSpeakers.filter((_, _idx) => _idx !== idx);
        setFieldValue('speakers', [...newSpeakers]);
    };

    const resetSpeakerInfo = (idx) => {
        let newSpeakers = formValues;
        newSpeakers = newSpeakers.map((newSpeaker, _idx) => {
            if (idx === _idx) {
                newSpeaker.speaker = {
                    about: '',
                    image: '',
                    name: '',
                    username: '',
                };
            }
            return newSpeaker;
        });
        setFieldValue('speakers', [...newSpeakers]);
    };

    const onLayoutNewSpeaker = (event) => {
        newSpeakerHeight.value = event.nativeEvent.layout.height;
    };

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

    useEffect(() => {
        if (!formValues.length) {
            newSpeakerHeight.value = 0;
        }
    }, [formValues]);

    return (
        <Animated.View onLayout={onLayout} style={style}>
            <View
                onLayout={onLayoutNewSpeaker}
                style={[classes.additionalSpeakers, { zIndex: -1 }]}
            >
                {formValues.length > 0 && (
                    <AdditionalSpeakers
                        openCreateSpeakerModal={openCreateSpeakerModal}
                        removeSpeaker={removeSpeaker}
                        resetSpeakerInfo={resetSpeakerInfo}
                        editSpeakerField={editSpeakerField}
                        additionalSpeakers={formValues}
                    />
                )}
            </View>
            <View style={classes.addNewSpeakerContainer}>
                <TouchableOpacity onPress={addNewSpeaker}>
                    <TextRegular size={16} color="#6478B8">
                        + Add Additional Speaker
                    </TextRegular>
                </TouchableOpacity>
            </View>
        </Animated.View>
    );
}

export default SpeakersSection;
