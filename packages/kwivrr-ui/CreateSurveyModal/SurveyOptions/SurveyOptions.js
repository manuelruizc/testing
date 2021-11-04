import React, { useMemo, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import InputComponent from 'kwivrr-ui/InputComponent';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { enumAnswerOptions } from 'kwivrr-common/data/types/surveys';
import TextRegular from 'kwivrr-ui/TextRegular';
import Touchable from 'kwivrr-ui/Touchable';
import useTheme from 'kwivrr-hooks/useTheme';
import Divider from 'kwivrr-ui/Divider';
import Select from 'kwivrr-ui/Select/Select';
import DatePicker from 'kwivrr-ui/DatePicker';
import InputDatePickerSelector from 'kwivrr-ui/InputDatePickerSelector';
import Questions from './Questions';

const deliveryTypeOptions = [
    { label: 'Email', value: 'Email' },
    { label: 'During LiveStream', value: 'During LiveStream' },
    { label: 'During Checkout', value: 'During Checkout' },
    { label: 'Web Alert', value: 'Web Alert' },
    { label: 'Text Message', value: 'Text Message' },
];

function SurveyOptions({ answerType, survey, errors, setSurvey }) {
    const { palette } = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const [deliveryType, setDeliveryType] = useState(null);
    const isTextAnswer = useMemo(
        () => answerType === enumAnswerOptions.TEXT,
        [answerType]
    );
    const classes = useStyles(styles, { isTextAnswer });
    const showDatePicker = () => {
        setIsVisible(true);
    };
    const handleConfirm = (date) => {
        const dateString = date.toString();
        setSurvey('scheduleRelease', dateString);
        setIsVisible(false);
    };
    const addNewAnswerOption = () => {
        survey.options.push('');
        setSurvey('options', [...survey.options]);
    };
    const changeOptionText = (text, index) => {
        survey.options[index] = text;
        setSurvey('options', [...survey.options]);
    };
    const deleteAnswerOption = (index) => {
        survey.options.splice(index, 1);
        setSurvey('options', [...survey.options]);
    };

    const selectDeliveryType = (deliveryT) => {
        setDeliveryType(deliveryT);
        setSurvey('deliveryType', deliveryT);
    };

    return (
        <React.Fragment>
            <View style={classes.container}>
                <InputComponent
                    value={survey.question}
                    onChangeText={(text) => setSurvey('question', text)}
                    inputStyle={{ ...classes.questionInputStyle }}
                    style={{
                        ...classes.row,
                    }}
                    placeholder="Question"
                    borderState={
                        errors.question ? 'tomato' : palette.button.primary
                    }
                    multiline={true}
                />
                {!isTextAnswer && (
                    <Questions
                        answerType={answerType}
                        options={survey.options}
                        changeOptionText={changeOptionText}
                        deleteAnswerOption={deleteAnswerOption}
                    />
                )}
                <Divider style={classes.divider} />
                {!isTextAnswer && answerType !== enumAnswerOptions.NO_OPTION && (
                    <View style={classes.row}>
                        <TouchableOpacity onPress={addNewAnswerOption}>
                            <TextRegular
                                style={classes.addNewAnswerText}
                                color={palette.button.primary}
                            >
                                + Add Additional Answer
                            </TextRegular>
                        </TouchableOpacity>
                    </View>
                )}
                <View style={classes.surveyDeliveryContainer}>
                    <InputDatePickerSelector
                        value={survey.scheduleRelease}
                        label="Schedule Release"
                        style={classes.inputDatePicker}
                        onPress={showDatePicker}
                        dateFormatted={false}
                        placeholder="00:00"
                    />
                    <Select
                        labelStyle={{ fontSize: 12 }}
                        value={deliveryType}
                        style={{
                            ...classes.inputStyle,
                            width: '100%',
                            borderWidth: 0,
                        }}
                        inputStyle={classes.inputDatePicker}
                        options={deliveryTypeOptions}
                        dropDownDirection="TOP"
                        label="Delivery"
                        placeholder="Select"
                        placeholderStyle={classes.placeholderStyle}
                        onChange={(value) => selectDeliveryType(value)}
                    />
                </View>
            </View>
            <DatePicker
                isVisible={isVisible}
                onConfirm={handleConfirm}
                mode="time"
                onCancel={() => setIsVisible(false)}
            />
        </React.Fragment>
    );
}

export default SurveyOptions;
