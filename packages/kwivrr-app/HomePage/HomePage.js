import React, { memo, useEffect, useMemo, useState } from 'react';
import { View, FlatList, ActivityIndicator } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import styles from './styles';
import Card from './Card';
import BuyTicket from 'kwivrr-ui/BuyTicket';
import useTutorialInfo from 'kwivrr-hooks/useTutorialInfo';
import TutorialOverlay from 'kwivrr-ui/TutorialOverlay';
import kwivrrApi from 'kwivrr-common/sdk';

function HomePage({ response, refetch, page, setPage }) {
    const classes = useStyles(styles);
    const [loadingPurchase, setLoadingPurchase] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchingOver, setFetchingOver] = useState(false);
    const [events, setEvents] = useState(response);
    const [buyTicketModal, setBuyTicketModal] = useState(false);
    const [selectedEventId, setSelectedEventId] = useState(-1);
    const [eventIdx, setEventIdx] = useState(-1);
    const { isUsersFirstTime } = useTutorialInfo();
    const [openTutorial, setOpenTutorial] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const checkIfIsTheFirstTimeInApp = async () => {
        // try {
        //     // const response = await isUsersFirstTime();
        //     // if (response) {
        //     //     // setOpenTutorial(true);
        //     // }
        // } catch (e) {
        //     console.error(e);
        // }
    };
    // const included = useMemo(() => {
    //     if (!Array.isArray(response.included) || response.included === null)
    //         return null;
    //     let info = response.included.find((item) => item.type === 'profile');
    //     return info ? info : null;
    // }, [response]);

    useEffect(() => {
        checkIfIsTheFirstTimeInApp();
    }, []);

    const onEndReached = async () => {
        try {
            // console.log({ fetchingOver, isLoading });
            if (fetchingOver || isLoading) return;
            setIsLoading(true);
            const response = await kwivrrApi.getFeeds({ page: page + 1 });
            const {
                listSummary: { hasMore },
            } = response;
            if (!hasMore) {
                setFetchingOver(true);
            }
            setPage((prev) => prev + 1);
            setEvents((prevEvents) => {
                return [...prevEvents, ...response.entries];
            });
            setIsLoading(false);
        } catch (e) {
            console.error(e);
            setFetchingOver(true);
            setIsLoading(false);
        }
    };

    const renderFooter = () => {
        if (!isLoading || fetchingOver) return null;
        return (
            <View style={classes.footer}>
                <ActivityIndicator size="large" color="tomato" />
            </View>
        );
    };

    useEffect(() => {
        setEvents([...response]);
    }, [response]);

    useEffect(() => {
        setIsRefreshing(false);
    }, [events]);

    const onRefresh = async () => {
        await refetch();
        setIsRefreshing(true);
        setIsLoading(false);
        setPage(1);
        setFetchingOver(false);
    };

    return (
        <React.Fragment>
            <View style={classes.container}>
                <View style={classes.scrollView}>
                    <FlatList
                        style={classes.scrollView}
                        contentContainerStyle={classes.scrollViewContent}
                        data={events}
                        keyExtractor={({ id }) => String(id)}
                        renderItem={({ item, index }) => {
                            return (
                                <Card
                                    // included={included}
                                    index={index}
                                    setEvents={setEvents}
                                    event={item}
                                    openModal={(eventIdSelected) => {
                                        setSelectedEventId(eventIdSelected);
                                        setBuyTicketModal(true);
                                        setEventIdx(index);
                                    }}
                                />
                            );
                        }}
                        onEndReached={onEndReached}
                        onEndReachedThreshold={0.4}
                        onRefresh={onRefresh}
                        refreshing={isRefreshing}
                        ListFooterComponent={renderFooter}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
            {buyTicketModal && (
                <KwivrrModal
                    absoluteCloseButton
                    modalStyle={{ ...classes.modalStyle }}
                    innerModalStyle={classes.kwivrrModalInnerModalStyle}
                    close={() => setBuyTicketModal(false)}
                    scrollViewKeyboard={true}
                >
                    <BuyTicket
                        loadingPurchase={loadingPurchase}
                        setLoadingPurchase={setLoadingPurchase}
                        eventId={selectedEventId}
                        eventIndex={eventIdx}
                        event={events[eventIdx]}
                        setEvents={setEvents}
                        from="feeds"
                    />
                </KwivrrModal>
            )}
            {/* {openTutorial && (
                <KwivrrModal
                    absoluteCloseButton
                    modalInnerStyle={{ height: '100%' }}
                    close={() => setOpenTutorial(false)}
                >
                    <TutorialOverlay />
                </KwivrrModal>
            )} */}
        </React.Fragment>
    );
}

export default memo(HomePage);
