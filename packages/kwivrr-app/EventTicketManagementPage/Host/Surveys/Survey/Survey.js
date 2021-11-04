import { View } from 'react-native';
import React, { useMemo } from 'react';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import TextHeader from 'kwivrr-ui/TextHeader';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import Touchable from 'kwivrr-ui/Touchable';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';

function Survey({
    textAnswer = false,
    survey: { question, answers },
    deleteSurvey,
    index,
}) {
    const classes = useStyles(styles);
    const finalAnswers = useMemo(() => {
        if (!answers && !Array.isArray(answers)) return [];
        if (answers.length === 0) return [];
        const newAnswers = answers
            .map((item) => {
                return {
                    answer: item.answer ? item.answer : '',
                    percentage: item.percentage ? item.percentage : 0,
                    preferredAnswer: false,
                };
            })
            .filter((newItem) => newItem.answer !== '');
        // let maxAnswers = {};
        // newAnswers.forEach(newAnswer => {

        // })
        return newAnswers;
    }, [answers]);

    const maxPercentage = useMemo(() => {
        if (finalAnswers.length === 0) return 0;
        let maxPercentage = 0;
        finalAnswers.forEach((finalAnswer) => {
            if (finalAnswer.percentage > maxPercentage) {
                maxPercentage = finalAnswer.percentage;
            }
        });
        return maxPercentage;
    }, [finalAnswers]);

    if (textAnswer) {
        return (
            <View style={classes.textAnswerContainer}>
                <View style={classes.questionHeaderContainer}>
                    <TextRegular size={16} style={classes.question}>
                        {question}
                    </TextRegular>
                    <Touchable onPress={() => deleteSurvey(index)}>
                        <View style={classes.deleteSurveyButton}>
                            <KwivrrIcon size={14} name="x" color="white" />
                        </View>
                    </Touchable>
                </View>
                <View style={classes.answersContainer}>
                    {answers.map(({ answer, username, avatar }, index) => (
                        <View style={classes.textAnswerInfoContainer}>
                            <View style={classes.topInfo}>
                                <KwivrrImage
                                    source={{ uri: avatar }}
                                    style={classes.avatarImage}
                                    resizeMode="cover"
                                />
                                <TextRegular>{username}</TextRegular>
                            </View>
                            <TextRegular style={classes.textAnswer}>
                                {answer}
                            </TextRegular>
                        </View>
                    ))}
                </View>
            </View>
        );
    }
    return (
        <View style={classes.multipleOptionsContainer}>
            <View style={classes.questionHeaderContainer}>
                <TextRegular size={16} style={classes.question}>
                    {question}
                </TextRegular>
                <Touchable onPress={() => deleteSurvey(index)}>
                    <View style={classes.deleteSurveyButton}>
                        <KwivrrIcon size={14} name="x" color="white" />
                    </View>
                </Touchable>
            </View>
            <View style={classes.answersContainer}>
                {finalAnswers.map(({ answer, percentage }, index) => {
                    return (
                        <View
                            key={index}
                            style={classes.answerPercentageContainer}
                        >
                            <View
                                style={[
                                    classes.percentageBar,
                                    { width: percentage + '%' },
                                ]}
                            />
                            {percentage === maxPercentage ? (
                                <>
                                    <TextHeader>{answer}</TextHeader>
                                    <TextHeader>{percentage}%</TextHeader>
                                </>
                            ) : (
                                <>
                                    <TextRegular>{answer}</TextRegular>
                                    <TextRegular>{percentage}%</TextRegular>
                                </>
                            )}
                        </View>
                    );
                })}
            </View>
        </View>
    );
}

export default Survey;
