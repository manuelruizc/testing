const styles = ({ palette }) => {
    return {
        textAnswerContainer: {
            width: '100%',
            alignItems: 'flex-start',
            marginBottom: 18,
        },
        answerContainer: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            width: '100%',
        },
        textAnswerInfoContainer: {
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
            marginBottom: 12,
        },
        topInfo: {
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            width: '100%',
            marginBottom: 2,
        },
        avatarImage: {
            width: 30,
            height: 30,
            borderRadius: 30,
            marginRight: 6,
        },
        multipleOptionsContainer: {
            marginBottom: 18,
        },
        textAnswer: {
            paddingLeft: 36,
        },
        question: {
            width: '80%',
            marginBottom: 8,
        },
        answersContainer: {
            alignItems: 'flex-start',
            justifyContent: 'flex-start',
        },
        answerPercentageContainer: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: palette.divider,
            height: 48,
            marginBottom: 12,
            borderRadius: 8,
            paddingHorizontal: 12,
            overflow: 'hidden',
        },
        percentageBar: {
            position: 'absolute',
            height: '100%',
            backgroundColor: '#67BFDC',
        },
        questionHeaderContainer: {
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
        },
        deleteSurveyButton: {
            padding: 4,
            borderRadius: 32,
            backgroundColor: 'tomato',
        },
    };
};

export default styles;
