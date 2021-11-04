import React, { memo, useState, useEffect, useMemo } from 'react';
import { Alert, Platform, ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextHeader from 'kwivrr-ui/TextHeader';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import AuthButton from 'kwivrr-ui/AuthButton';
import { useFormik } from 'formik';
import { useNavigation } from '@react-navigation/core'; // for when creating the stream
import { ValidationSchema } from './schemas';
import AdvancedDetails from './AdvancedDetails';
import StreamDetails from './StreamDetails';
import StreamPageModal from './StreamPageModal';
import useAnimatedClasses from 'kwivrr-hooks/useAnimatedClasses';
import animatedStyles from './animatedStyles';
// import { LIVESTREAM, STACKS } from 'kwivrr-common/data/types/navigation'; // for when creating the stream
import LoadingUI from 'kwivrr-ui/LoadingUI';
import SchedulingAndTicketing from './SchedulingAndTicketing';
import SpeakersSection from './SpeakersSection';
import Divider from 'kwivrr-ui/Divider';
import Touchable from 'kwivrr-ui/Touchable';
import TextRegular from 'kwivrr-ui/TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';
import { getRandomEventForClone } from 'kwivrr-common/data/fetch/createstream';
import ChevronHeader from 'kwivrr-ui/ChevronHeader';
import {
    CREATE,
    HOME,
    LIVESTREAM,
    STACKS,
} from 'kwivrr-common/data/types/navigation';
import {
    createPayloadForNewEvent,
    createPayloadForNewEventPublicMethod,
} from './helpers';
import useActions from 'kwivrr-hooks/useActions';
import useAppActions from 'kwivrr-hooks/useAppActions';

const date = moment(new Date()).format('MM/DD/YYYY HH:mm:ss');
const ScrollContainer =
    Platform.OS === 'android' ? ScrollView : KeyboardAwareScrollView;

const contains = {
    streamDetails: {
        title: true,
        isPrivate: true,
        provider: true,
        embedCode: true,
    },
    marketing: {
        coverUrl: true,
        description: true,
        shopLink: true,
        languagesSupported: true,
    },
    schedulingAndTicketing: {
        customTimeZone: true,
        startTime: true,
        endTime: true,
        archive: true,
        publish: true,
        hasCountdown: true,
        isTicketed: true,
        generalTicketDescription: true,
        vipTicketDescription: true,
        price: true,
        vipPrice: true,
        quantity: true,
        vipQuantity: true,
    },
    speakers: true,
};

function StreamPage({ route }) {
    const { addNewEvent } = useAppActions();
    const { onCreateEvent } = useActions();
    const [startRender, setStartRender] = useState(false);
    const { palette } = useTheme();
    const { navigate } = useNavigation();
    const goLiveShared = useSharedValue(1);
    const onPressIn = () => (goLiveShared.value = withSpring(0.92));
    const onPressOut = () => (goLiveShared.value = withSpring(1));
    const classes = useStyles(styles);
    const detailsActive = useSharedValue(true);
    const schedulingAndTicketingActive = useSharedValue(false);
    const speakersActive = useSharedValue(false);
    const advancedActive = useSharedValue(false);
    const surveysActive = useSharedValue(false);
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentSpeakerIndex, setCurrentSpeakerIndex] = useState(-1);
    const [onLayoutDone, setOnLayoutDone] = useState({
        advanced: false,
        general: false,
    });

    const initialValues = useMemo(
        () => ({
            archive: null, // date
            coverUrl: {
                source: '',
                url: '',
                base64: '',
            },
            customTimezone: false,
            embedCode: '',
            endTime: null, // date
            description: '',
            disclaimer: '',
            generalTicketDescription: '',
            groups: [],
            hasCountdown: false,
            isInPerson: true,
            isStream: false,
            isPrivate: false,
            isTicketed: false,
            languagesSupported: [],
            learnMoreUrl: '',
            price: null,
            publish: null, // date
            provider: '',
            quantity: null,
            paymentAccount: null, // ????
            shopLink: '',
            speakers: [],
            startTime: null, // date
            title: '',
            vipPrice: null,
            vipQuantity: null,
            vipTicketDescription: '',
        }),
        []
    );

    const formOptions = useFormik({
        validationSchema: ValidationSchema,
        initialValues,
    });

    const { values, errors } = formOptions;

    const addNewSpeaker = (newSpeaker) => {
        const { values, setFieldValue } = formOptions;
        const newSpeakers = [...values.speakers, newSpeaker];
        setFieldValue('speakers', [...newSpeakers]);
    };

    const editSpeakerField = (key, idx, value) => {
        const { values, setFieldValue } = formOptions;
        let editedSpeakers = values.speakers;
        editedSpeakers[idx][key] = value;
        setFieldValue('speakers', [...editedSpeakers]);
    };

    const openCreateSpeakerModal = (idx) => {
        setCurrentSpeakerIndex(idx);
        setModal(true);
    };

    const toggle = (payload, open = false) => {
        if (payload === 'details') {
            if (open) {
                return (detailsActive.value = true);
            }
            return (detailsActive.value = !detailsActive.value);
        } else if (payload === 'ticketing') {
            if (open) {
                return (schedulingAndTicketingActive.value = true);
            }
            return (schedulingAndTicketingActive.value =
                !schedulingAndTicketingActive.value);
        } else if (payload === 'speakers') {
            if (open) {
                return (speakersActive.value = true);
            }
            return (speakersActive.value = !speakersActive.value);
        } else if (payload === 'surveys') {
            if (open) {
                return (surveysActive.value = true);
            }
            return (surveysActive.value = !surveysActive.value);
        }
        if (open) {
            return (advancedActive.value = true);
        }
        return (advancedActive.value = !advancedActive.value);
    };

    const {
        detailsChevronStyle,
        advancedChevronStyle,
        schedulingAndTicketingChevronStyle,
        speakersChevronStyle,
        surveysChevronStyle,
        goLiveStyle,
    } = useAnimatedClasses(animatedStyles, {
        advancedActive,
        detailsActive,
        speakersActive,
        schedulingAndTicketingActive,
        surveysActive,
        goLiveShared,
    });

    const createStream = async () => {
        try {
            setLoading(true);
            const { errors } = formOptions;
            if (!values.isInPerson && !values.isStream) return;
            const payload = createPayloadForNewEventPublicMethod(values);
            // const payload = {
            //     zevents_event,
            //     userId: 'me',
            // };
            const response = await onCreateEvent(payload);
            const { id: eventId } = response;
            const { startTime, isStream } = values;
            formOptions.resetForm();
            setLoading(false);
            addNewEvent('CreateEvent');
            if (startTime === null && isStream) {
                return navigate(STACKS.LIVESTREAM, {
                    params: {
                        eventId,
                    },
                    screen: LIVESTREAM.STREAM,
                });
            }
            return navigate(HOME.SPLASH, {
                eventId,
            });
            if (values.isStream) {
                formOptions.resetForm();
                return navigate(CREATE.LIVESTREAM, {
                    shareInfo: null,
                    url: null,
                });
            }
            formOptions.resetForm();
            return Alert.alert('Stream Created', '', [
                { text: 'OK', onPress: () => navigate(HOME.INITIAL) },
            ]);
        } catch (e) {
            Alert.alert(
                'Error on event creation',
                'There was an error on when trying to create a new event'
            );
            setLoading(false);
        }
    };

    const buttonDisabled = useMemo(
        () => loading || Object.keys(formOptions.errors).length > 0,
        [formOptions.errors, loading]
    );

    const manageAccordions = (expand) => {
        detailsActive.value = expand;
        schedulingAndTicketingActive.value = expand;
        speakersActive.value = expand;
        advancedActive.value = expand;
        surveysActive.value = expand;
    };

    useEffect(() => {
        setTimeout(() => {
            setStartRender(true);
        }, 1500);
    }, []);

    useEffect(() => {
        if (!route.params) return;
        if (route.params.cloning) {
            const randomEventInfo = getRandomEventForClone();
            formOptions.setValues(randomEventInfo);
        }
    }, [route.params]);

    useEffect(() => {
        if (values.isInPerson) {
            toggle('marketing', true);
        }
    }, [values.isInPerson]);

    const errorsBySection = useMemo(() => {
        const errors = {
            streamDetails: false,
            marketing: false,
            schedulingAndTicketing: false,
            speakers: false,
        };
        const containsError = {
            streamDetails: false,
            marketing: false,
            schedulingAndTicketing: false,
            speakers: false,
        };
        Object.keys(formOptions.errors).forEach((key) => {
            if (contains.speakers[key]) {
                errors.speakers = true;
                containsError.speakers = true;
            } else {
                if (!containsError.speakers) {
                    errors.speakers = false;
                }
            }
            if (contains.streamDetails[key]) {
                errors.streamDetails = true;
                containsError.streamDetails = true;
            } else {
                if (!containsError.streamDetails) {
                    errors.streamDetails = false;
                }
            }
            if (contains.marketing[key]) {
                errors.marketing = true;
                containsError.marketing = true;
            } else {
                if (!containsError.marketing) {
                    errors.marketing = false;
                }
            }
            if (contains.schedulingAndTicketing[key]) {
                errors.schedulingAndTicketing = true;
                containsError.schedulingAndTicketingasd = true;
            } else {
                if (!containsError.schedulingAndTicketing) {
                    errors.schedulingAndTicketing = false;
                }
            }
        });
        return errors;
    }, [formOptions.errors]);

    return (
        <View style={classes.container}>
            <View style={classes.topInfo}>
                <Touchable onPress={() => manageAccordions(true)}>
                    <TextRegular
                        color={palette.button.primary}
                        style={classes.expandButton}
                    >
                        Expand All
                    </TextRegular>
                </Touchable>
                <Touchable onPress={() => manageAccordions(false)}>
                    <TextRegular
                        color={palette.button.primary}
                        style={classes.expandButton}
                    >
                        Collapse All
                    </TextRegular>
                </Touchable>
            </View>
            {startRender && (
                <React.Fragment>
                    <View style={classes.scrollContainer}>
                        <KeyboardAwareScrollView
                            showsVerticalScrollIndicator={true}
                            extraScrollHeight={140}
                            keyboardShouldPersistTaps="handled"
                            // enableAutomaticScroll={false}
                            nestedScrollEnabled
                            enableOnAndroid
                            viewIsInsideTabBar
                            enableResetScrollToCoords={false}
                            style={classes.scrollView}
                            contentContainerStyle={
                                classes.contentContainerStyle
                            }
                        >
                            <View style={classes.section}>
                                <ChevronHeader
                                    error={errorsBySection.streamDetails}
                                    title="Stream Details"
                                    style={detailsChevronStyle}
                                    toggleKey="details"
                                    toggle={toggle}
                                />
                                <StreamDetails
                                    detailsActive={detailsActive}
                                    formOptions={formOptions}
                                    setOnLayoutDone={setOnLayoutDone}
                                />
                                <Divider style={classes.divider} />
                            </View>
                            <View style={classes.section}>
                                <ChevronHeader
                                    error={errorsBySection.marketing}
                                    title="Marketing"
                                    style={advancedChevronStyle}
                                    toggleKey="advanced"
                                    toggle={toggle}
                                />
                                <AdvancedDetails
                                    advancedActive={advancedActive}
                                    formOptions={formOptions}
                                    setModal={setModal}
                                    setOnLayoutDone={setOnLayoutDone}
                                />
                                <Divider style={classes.divider} />
                            </View>
                            <View style={classes.section}>
                                <ChevronHeader
                                    error={
                                        errorsBySection.schedulingAndTicketing
                                    }
                                    title="Scheduling & Ticketing"
                                    style={schedulingAndTicketingChevronStyle}
                                    toggleKey="ticketing"
                                    toggle={toggle}
                                />
                                <SchedulingAndTicketing
                                    active={schedulingAndTicketingActive}
                                    formOptions={formOptions}
                                />
                                <Divider style={classes.divider} />
                            </View>
                            <View style={classes.section}>
                                <ChevronHeader
                                    error={errorsBySection.speakers}
                                    title="Speakers"
                                    style={speakersChevronStyle}
                                    toggleKey="speakers"
                                    toggle={toggle}
                                />
                                <SpeakersSection
                                    addNewSpeaker={addNewSpeaker}
                                    active={speakersActive}
                                    editSpeakerField={editSpeakerField}
                                    openCreateSpeakerModal={
                                        openCreateSpeakerModal
                                    }
                                    formOptions={formOptions}
                                />
                                <Divider style={classes.divider} />
                            </View>
                            {/* <View style={classes.section}>
                                <ChevronHeader
                                    title="Surveys"
                                    style={surveysChevronStyle}
                                    toggleKey="surveys"
                                    toggle={toggle}
                                />
                                <SurveysSection
                                    addNewSpeaker={addNewSpeaker}
                                    active={surveysActive}
                                    editSpeakerField={editSpeakerField}
                                    openCreateSpeakerModal={
                                        openCreateSpeakerModal
                                    }
                                    formOptions={formOptions}
                                />
                                <Divider style={classes.divider} />
                            </View> */}
                        </KeyboardAwareScrollView>
                    </View>
                    <StartStreamButton
                        goLiveStyle={goLiveStyle}
                        classes={classes}
                        createStream={createStream}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        streamEvent={values.isStream}
                        disabled={buttonDisabled}
                        isLoading={loading}
                    />
                </React.Fragment>
            )}
            {modal && (
                <StreamPageModal
                    title="Create Speaker"
                    close={() => setModal(false)}
                    editSpeakerField={editSpeakerField}
                    currentSpeakerIndex={currentSpeakerIndex}
                />
            )}
            {(!onLayoutDone.advanced || !onLayoutDone.general) && (
                <View style={classes.loadingTopLayer}>
                    <LoadingUI />
                </View>
            )}
        </View>
    );
}

const StartStreamButton = memo(
    ({
        goLiveStyle,
        classes,
        createStream,
        onPressIn,
        onPressOut,
        streamEvent,
        ...rest
    }) => (
        <Animated.View pointerEvents="box-none" style={goLiveStyle}>
            <AuthButton
                style={classes.authButton}
                buttonStyle={classes.authButtonPadding}
                gradientBackground
                onPress={createStream}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                uppercase={false}
                activityIndicatorColor="white"
                {...rest}
            >
                <TextHeader color="white" size={24}>
                    {streamEvent ? 'Go Live' : 'Save'}
                </TextHeader>
            </AuthButton>
        </Animated.View>
    )
);

StreamPage.propTypes = {
    navigation: PropTypes.object,
};

export default StreamPage;
