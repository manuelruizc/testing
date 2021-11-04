import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Survey from './Survey/Survey';
import faker from 'faker';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Touchable from 'kwivrr-ui/Touchable';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import useTheme from 'kwivrr-hooks/useTheme';
import useConfirmModal from 'kwivrr-hooks/useConfirmModal';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import CreateSurveyModal from 'kwivrr-ui/CreateSurveyModal';

const _surveys = [
    {
        type: 'multiple-option',
        question: 'Which social media do you prefer?',
        answers: [
            {
                answer: 'Facebook',
                percentage: 33,
            },
            {
                answer: 'Instagram',
                percentage: 15,
            },
            {
                answer: 'Twitter',
                percentage: 50,
            },
            {
                answer: 'Reddit',
                percentage: 2,
            },
        ],
    },
    {
        type: 'text-answer',
        question: 'What do you like most about the beach?',
        answers: [
            {
                username: 'Richard Daniels',
                avatar: faker.image.avatar(),
                answer: 'I love that my kids are able to run around and burn off some energy!',
            },
            {
                username: 'Samuel Wise',
                avatar: faker.image.avatar(),
                answer: "It's the perfect place to relax on a day off.",
            },
            {
                username: 'Paisley Anderson',
                avatar: faker.image.avatar(),
                answer: 'Suntanning',
            },
        ],
    },
];

function Surveys({ openNewSurveyModal }) {
    const classes = useStyles(styles);
    const { palette } = useTheme();
    const [surveys, setSurveys] = useState(_surveys);
    const [isCreateSurveyModalActive, setIsCreateSurveyModalActive] =
        useState(false);
    const { openConfirmModal } = useConfirmModal();
    const confirmDelete = (index, id) => {
        setSurveys((prevSurveys) => {
            prevSurveys.splice(index, 1);
            return [...prevSurveys];
        });
    };

    const createSurvey = (survey) => {
        const newSurvey = {
            type: survey.type === 0 ? 'text-answer' : 'multiple-option',
            question: survey.question,
            answers: [],
        };
        setSurveys((prevSurveys) => {
            prevSurveys.push(newSurvey);
            return [...prevSurveys];
        });
    };

    const deleteSurvey = (index, id = 1) => {
        openConfirmModal(
            [
                'Are you sure you want to delete this survey?',
                'Cancel',
                'Confirm',
            ],
            confirmDelete,
            [index, id]
        );
    };

    return (
        <React.Fragment>
            <View>
                <View style={classes.topOptions}>
                    <Touchable
                        onPress={() => setIsCreateSurveyModalActive(true)}
                    >
                        <TextRegular
                            color={palette.button.primary}
                            style={classes.addAdditionalSurvey}
                        >
                            <KwivrrIcon
                                color={palette.button.primary}
                                name="plus"
                                size={16}
                            />{' '}
                            Add Additional Survey
                        </TextRegular>
                    </Touchable>
                    <Touchable>
                        <TextRegular color={palette.button.primary}>
                            <KwivrrIcon
                                color={palette.button.primary}
                                name="download"
                                size={16}
                            />{' '}
                            Download Results
                        </TextRegular>
                    </Touchable>
                </View>
                {surveys.map((survey, index) => (
                    <Survey
                        key={index}
                        index={index}
                        deleteSurvey={deleteSurvey}
                        textAnswer={survey.type === 'text-answer'}
                        survey={survey}
                    />
                ))}
            </View>
            {isCreateSurveyModalActive && (
                <KwivrrModal
                    usingScrollView={false}
                    scrollViewKeyboard
                    absoluteCloseButton
                    title="Create Survey"
                    close={() => setIsCreateSurveyModalActive(false)}
                >
                    <CreateSurveyModal createNewSurvey={createSurvey} />
                </KwivrrModal>
            )}
        </React.Fragment>
    );
}

export default Surveys;
