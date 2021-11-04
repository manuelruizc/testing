import React, { useEffect, useMemo, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Touchable from 'kwivrr-ui/Touchable';
import TextRegular from 'kwivrr-ui/TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';
import SurveyOptions from './SurveyOptions/SurveyOptions';
import useDimensions from 'kwivrr-hooks/useDimensions';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { enumAnswerOptions } from 'kwivrr-common/data/types/surveys';
import AuthButton from 'kwivrr-ui/AuthButton';
import { useFormik } from 'formik';
import { SurveySchema } from './schema';
import usePlatform from 'kwivrr-hooks/usePlatftorm';

const answerTypes = [
    {
        type: enumAnswerOptions.SINGLE,
        label: 'Single Answer',
    },
    {
        type: enumAnswerOptions.MULTIPLE,
        label: 'Multiple Choice',
    },
    {
        type: enumAnswerOptions.TEXT,
        label: 'Text Answer',
    },
];

function CreateSurveyModal({ closeModal, createNewSurvey }) {
    const { palette } = useTheme();
    const { isAndroid } = usePlatform();
    const { screenHeight } = useDimensions();
    const height = useSharedValue(0);
    const [answerType, setAnswerType] = useState(enumAnswerOptions.NO_OPTION);
    const {
        values,
        setFieldValue: setFieldValue,
        errors,
    } = useFormik({
        initialValues: {
            type: enumAnswerOptions.NO_OPTION,
            question: '',
            options: ['', '', '', ''],
            deliveryType: '',
            scheduleRelease: '',
        },
        initialErrors: {
            scheduleRelease: true,
            deliveryType: true,
            question: true,
        },
        validationSchema: SurveySchema,
    });

    useEffect(() => {
        if (answerType === enumAnswerOptions.NO_OPTION) {
            height.value = withTiming(0);
        } else if (
            answerType === enumAnswerOptions.SINGLE ||
            answerType === enumAnswerOptions.MULTIPLE
        ) {
            height.value = withTiming(
                isAndroid ? screenHeight * 0.48 : screenHeight * 0.48
            );
        } else if (answerType === enumAnswerOptions.TEXT) {
            height.value = withTiming(screenHeight * 0.26);
        }
    }, [answerType]);

    const style = useAnimatedStyle(() => {
        return {
            height: height.value,
            overflow: 'hidden',
        };
    });

    const onOptionPress = (option) => {
        const newAnswerType =
            option === answerType ? enumAnswerOptions.NO_OPTION : option;
        setAnswerType(newAnswerType);
        setFieldValue('type', newAnswerType);
    };

    const disabledButton = useMemo(() => {
        const errorFree = Object.keys(errors).length === 0;
        if (values.type === enumAnswerOptions.TEXT) {
            if (errorFree && values.question.length > 0) {
                return false;
            } else {
                return true;
            }
        }
        let i = 0,
            j = values.options.length - 1,
            optionsAreEmpty = false;
        while (i !== j && i < j) {
            if (
                values.options[i++].length === 0 ||
                values.options[j--].length === 0
            ) {
                optionsAreEmpty = true;
                break;
            }
        }
        if (errorFree && !optionsAreEmpty) {
            return false;
        }
        return true;
    }, [errors, values]);

    const addSurvey = () => {
        if (!disabledButton) {
            createNewSurvey(values);
            closeModal();
        }
    };

    const classes = useStyles(styles, { disabledButton });

    return (
        <View style={classes.container}>
            <View style={classes.answerOptions}>
                {answerTypes.map((answerOption) => {
                    return (
                        <TouchableOpacity
                            onPress={() => onOptionPress(answerOption.type)}
                            key={answerOption.type}
                            full
                            centered
                            style={classes.answerOptionButtonContainer}
                        >
                            <View
                                style={[
                                    classes.answerOptionButton,
                                    answerType === answerOption.type && {
                                        backgroundColor: palette.button.primary,
                                        borderWidth: 0,
                                    },
                                ]}
                            >
                                <TextRegular
                                    color={
                                        answerType === answerOption.type
                                            ? palette.common.white
                                            : palette.button.primary
                                    }
                                >
                                    {answerOption.label}
                                </TextRegular>
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
            <Animated.View style={style}>
                {answerType !== enumAnswerOptions.NO_OPTION && (
                    <SurveyOptions
                        errors={errors}
                        answerType={answerType}
                        survey={values}
                        setSurvey={setFieldValue}
                    />
                )}
            </Animated.View>
            {answerType !== enumAnswerOptions.NO_OPTION && (
                <React.Fragment>
                    <TouchableOpacity onPress={closeModal}>
                        <TextRegular
                            color={palette.button.primary}
                            style={classes.saveDraft}
                        >
                            Save Draft
                        </TextRegular>
                    </TouchableOpacity>
                    <AuthButton
                        onPress={addSurvey}
                        disabled={disabledButton}
                        uppercase={false}
                        backgroundColor={palette.button.primary}
                        style={classes.authButtonContainer}
                        buttonStyle={classes.authButton}
                        textColor="white"
                        textFontSize={18}
                    >
                        Create Survey
                    </AuthButton>
                </React.Fragment>
            )}
            <TouchableOpacity onPress={closeModal}>
                <TextRegular>Cancel</TextRegular>
            </TouchableOpacity>
        </View>
    );
}

export default CreateSurveyModal;
