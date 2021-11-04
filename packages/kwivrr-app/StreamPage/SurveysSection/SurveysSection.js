import React, { useState, useEffect } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
import useAnimatedClasses from 'kwivrr-hooks/useAnimatedClasses';
import animatedStyles from './animatedStyles';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import Touchable from 'kwivrr-ui/Touchable';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import useConfirmModal from 'kwivrr-hooks/useConfirmModal';
import useToast from 'kwivrr-hooks/useToast';
import CreateSurveyModal from 'kwivrr-ui/CreateSurveyModal';

function SurveysSection({ active, formOptions, addNewSpeaker: setSpeaker }) {
    const {
        handleChange,
        setFieldValue,
        handleSubmit,
        setFieldTouched,
        errors,
        touched,
        values: formValues,
    } = formOptions;
    const classes = useStyles(styles);
    const { openConfirmModal } = useConfirmModal();
    const { createToast } = useToast();
    const [layoutDone, setLayoutDone] = useState(false);
    const [isCreateSurveyModalActive, setIsCreateSurveyModalActive] =
        useState(false);
    const surveysHeight = useSharedValue(0);
    const [totalHeight, setTotalHeight] = useState(0);
    const { style } = useAnimatedClasses(
        animatedStyles,
        { active, surveysHeight },
        { totalHeight, layoutDone }
    );
    const onLayout = (event) => {
        if (layoutDone) return;
        const { height: _height } = event.nativeEvent.layout;
        setLayoutDone(true);
        runOnJS(setTotalHeight)(_height);
    };

    const removeSpeaker = (idx) => {
        let newSpeakers = formValues.speakers;
        newSpeakers = newSpeakers.filter((_, _idx) => _idx !== idx);
        setFieldValue('speakers.speakers', [...newSpeakers]);
    };

    const resetSpeakerInfo = (idx) => {
        let newSpeakers = formValues.speakers;
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

    const onLayoutSurveys = (event) => {
        surveysHeight.value = event.nativeEvent.layout.height;
    };

    const createNewSurvey = (newSurvey) => {
        formValues.surveys.push(newSurvey);
        setFieldValue('surveys', [...formValues.surveys]);
    };

    const deleteSurvey = (index) => {
        formValues.surveys.splice(index, 1);
        setFieldValue('surveys', [...formValues.surveys]);
        createToast({
            text: `Survey deleted`,
            icon: 'check-circle',
            color: '#51DA9F',
            id: index + new Date().toUTCString(),
        });
    };

    useEffect(() => {
        if (!formValues.surveys.length) {
            surveysHeight.value = 0;
        }
    }, [formValues.surveys]);

    return (
        <React.Fragment>
            <Animated.View onLayout={onLayout} style={style}>
                <View onLayout={onLayoutSurveys}>
                    {formValues.surveys.length > 0 &&
                        formValues.surveys.map((survey, index) => (
                            <View key={index} style={classes.surveysContainer}>
                                <TextRegular>{survey.question}</TextRegular>
                                <Touchable
                                    onPress={() =>
                                        openConfirmModal(
                                            [
                                                'Are you sure you want to delete this survey?',
                                                'Cancel',
                                                'Confirm',
                                            ],
                                            deleteSurvey,
                                            [index]
                                        )
                                    }
                                >
                                    <View style={classes.deleteSurveyIcon}>
                                        <KwivrrIcon
                                            name="x"
                                            color="white"
                                            size={16}
                                        />
                                    </View>
                                </Touchable>
                            </View>
                        ))}
                </View>
                <View style={classes.addNewSpeakerContainer}>
                    <TouchableOpacity
                        onPress={() => setIsCreateSurveyModalActive(true)}
                    >
                        <TextRegular size={16} color="#6478B8">
                            + Add Survey
                        </TextRegular>
                    </TouchableOpacity>
                </View>
            </Animated.View>
            {isCreateSurveyModalActive && (
                <KwivrrModal
                    usingScrollView={false}
                    scrollViewKeyboard
                    absoluteCloseButton
                    title="Create Survey"
                    close={() => setIsCreateSurveyModalActive(false)}
                >
                    <CreateSurveyModal createNewSurvey={createNewSurvey} />
                </KwivrrModal>
            )}
        </React.Fragment>
    );
}

export default SurveysSection;
