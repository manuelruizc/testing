import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from '../TextRegular';
import KwivrrIcon from '../KwivrrIcon';
import Animated, {
    Extrapolate,
    interpolate,
    interpolateColor,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
} from 'react-native-reanimated';
import useDimensions from 'kwivrr-hooks/useDimensions';
import useTheme from 'kwivrr-hooks/useTheme';
import useTutorialInfo from 'kwivrr-hooks/useTutorialInfo';
import KwivrrImage from '../KwivrrImage';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

const cards = [
    {
        image: 'https://images.unsplash.com/photo-1573164574230-db1d5e960238?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        text: '',
    },
    {
        image: 'https://images.unsplash.com/photo-1542744094-f77e9f7a10b8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        text: '',
    },
    {
        image: 'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1400&q=80',
        text: '',
    },
    {
        image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
        text: '',
    },
];

const arr = new Array(4).fill(null);
const numberOfCards = arr.length;

function TutorialOverlay({ closeModal }) {
    const { palette } = useTheme();
    const { screenWidth } = useDimensions();
    const classes = useStyles(styles);
    const animated = useSharedValue(0);
    const scrollViewRef = useRef();
    const { dontShowTutorialAnymore } = useTutorialInfo();

    const [currentCard, setCurrentCard] = useState(0);
    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const index = event.contentOffset.x / (screenWidth * 0.95);
            animated.value = index;
        },
    });
    // useEffect(() => {
    //     console.log(currentCard);
    // }, [currentCard]);
    const onScrollEnd = (event) => {
        const index = Math.round(
            event.nativeEvent.contentOffset.x / (screenWidth * 0.95)
        );
        setCurrentCard(index);
        // animated.value = index;
    };

    const onPressScrollKeys = (next = true) => {
        const index = next ? animated.value + 1 : animated.value - 1;
        scrollViewRef.current?.scrollTo({
            x: index * (screenWidth * 0.95),
            y: 0,
        });
    };

    const hideTutorialForever = () => {
        dontShowTutorialAnymore();
        closeModal();
    };

    return (
        <View style={classes.container}>
            <Animated.ScrollView
                ref={scrollViewRef}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                style={classes.scrollView}
                contentContainerStyle={classes.scrollViewContent}
                onMomentumScrollEnd={onScrollEnd}
            >
                {cards.map((_, index) => (
                    <TutorialCard
                        key={index}
                        index={index}
                        text={_.text}
                        image={_.image}
                    />
                ))}
            </Animated.ScrollView>
            <View style={classes.skipContainer}>
                <TouchableOpacity onPress={hideTutorialForever}>
                    <TextRegular color={palette.button.primary}>
                        Skip
                    </TextRegular>
                </TouchableOpacity>
            </View>
            <View style={classes.buttonsContainer}>
                <TouchableOpacity onPress={() => onPressScrollKeys(false)}>
                    <KwivrrIcon size={28} name="arrow-left" />
                </TouchableOpacity>
                <View style={classes.dots}>
                    {cards.map((_, index) => (
                        <Dot key={index} index={index} animated={animated} />
                    ))}
                </View>
                <TouchableOpacity
                    onPress={
                        currentCard === arr.length - 1
                            ? hideTutorialForever
                            : onPressScrollKeys
                    }
                >
                    {currentCard === arr.length - 1 ? (
                        <TextRegular>Done</TextRegular>
                    ) : (
                        <KwivrrIcon size={28} name={'arrow-right'} />
                    )}
                </TouchableOpacity>
            </View>
        </View>
    );
}

function Dot({ animated, index }) {
    const { palette } = useTheme();
    const style = useAnimatedStyle(() => {
        return {
            width: 8,
            height: 8,
            borderRadius: 30,
            backgroundColor: interpolateColor(
                animated.value,
                [index - 1, index, index + 1],
                ['gray', palette.button.primary, 'gray']
            ),
            marginHorizontal: 4,
            transform: [
                {
                    scale: interpolate(
                        animated.value,
                        [index - 1, index, index + 1],
                        [1, 1.5, 1],
                        Extrapolate.CLAMP
                    ),
                },
            ],
        };
    });
    return <Animated.View style={style} />;
}

function TutorialCard({ index, image, text }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.tutorialCard}>
            <View style={classes.visualFeedbackContainer}>
                <KwivrrImage
                    source={{ uri: imageSourceWithoutCache(image) }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                />
            </View>
            <TextRegular size={18} style={classes.tutorialCardDescription}>
                Lorem {index} Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book. It has survived not only five centuries, but also
                the leap into electronic typesetting, remaining essentially
                unchanged.
            </TextRegular>
        </View>
    );
}

TutorialOverlay.propTypes = {
    closeModal: PropTypes.func.isRequired,
};

export default TutorialOverlay;
