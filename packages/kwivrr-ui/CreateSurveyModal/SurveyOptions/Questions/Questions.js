import React, { memo, useRef } from 'react';
import { ScrollView, View } from 'react-native';
import { enumAnswerOptions } from 'kwivrr-common/data/types/surveys';
import Option from './Option';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';

function Questions({
    answerType,
    options,
    changeOptionText,
    deleteAnswerOption,
}) {
    const scrollView = useRef(null);
    const classes = useStyles(styles);
    if (
        answerType === enumAnswerOptions.TEXT ||
        answerType === enumAnswerOptions.NO_OPTION
    )
        return <React.Fragment></React.Fragment>;
    return (
        <View style={classes.optionsContainer}>
            <ScrollView
                ref={scrollView}
                onContentSizeChange={() => {
                    scrollView.current?.scrollToEnd({
                        animated: true,
                    });
                }}
                contentContainerStyle={classes.contentContainerStyle}
            >
                {options &&
                    options.length > 0 &&
                    options.map((option, index) => {
                        return (
                            <Option
                                key={index}
                                index={index}
                                option={option}
                                changeOptionText={changeOptionText}
                                deleteAnswerOption={deleteAnswerOption}
                            />
                        );
                    })}
            </ScrollView>
        </View>
    );
}

export default memo(Questions);
