import React, { useCallback, useState, useMemo, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Header from '../Header';
import { modalsInfo, onSelectModal, _ticketData } from '../utils';
import { filterTicketOptions } from './util';
import Tickets from './Tickets';
import ChevronHeader from 'kwivrr-ui/ChevronHeader';
import useAnimatedClasses from 'kwivrr-hooks/useAnimatedClasses';
import animatedStyles from './animatedStyles';
import { useSharedValue } from 'react-native-reanimated';
import Accordion from 'kwivrr-ui/Accordion';
import Overview from './Overview';
// import Surveys from './Surveys/Surveys';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import Modal from '../Modal';
import useToast from 'kwivrr-hooks/useToast';
import useBottomSheet from 'kwivrr-hooks/useBottomSheet';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import faker from 'faker';
import useActions from 'kwivrr-hooks/useActions';
import TextRegular from 'kwivrr-ui/TextRegular';
import useInfiniteScroll from 'kwivrr-hooks/useInfiniteScroll';
import kwivrrApi from 'kwivrr-common/sdk';
import { debounce } from 'lodash';
import { TICKET_STATE } from 'kwivrr-common/data/types/ticket';
import Scanner from './Scanner';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import useTheme from 'kwivrr-hooks/useTheme';
import EventManager from 'kwivrr-ui/EventManager/EventManager';

function Host({
    event,
    comingFromManagement,
    comingFrom,
    eventName,
    eventImage,
    eventStartDatetime,
    hostName,
    eventId,
    data,
    included,
    tickets: ticketsApi,
    listSummary,
}) {
    const { palette } = useTheme();
    const [initialSearch, setInitialSearch] = useState(false);
    const [scannerOpen, setScannerOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [term, setTerm] = useState('');
    const [eventManagerModal, setEventManagerModal] = useState(false);
    const [fetchingTerm, setFetchingTerm] = useState(false);
    const [includeTickets] = useState(ticketsApi.length > 0);
    const {
        isLoading,
        fetchingOver,
        page,
        data: tickets,
        setData: setTickets,
        onEndReached,
        refresh,
        dataRefetch,
        dataRefetchToPage,
    } = useInfiniteScroll({
        initialFetchingOver: !listSummary.hasMore,
        fetchCall: async (pageFrom = null) => {
            const response = await kwivrrApi.getEventHostTickets({
                eventId,
                page: pageFrom === null ? page + 1 : pageFrom,
                term,
                scope: 'host',
            });
            const toReturn = {
                entries: response.entries,
                hasMore: response.listSummary.hasMore,
            };
            return toReturn;
        },
        initialData: ticketsApi,
    });
    // const [tickets, setTickets] = useState(ticketsApi);
    const {
        onCheckInVirtualEventTicket,
        onCheckInPhysicalEventTicket,
        onUncheckEventTicket,
    } = useActions();

    const { userType } = useAuthCredentials();
    // const { expand } = useQRCode();
    const [modalOptions, setModalOptions] = useState({
        active: false,
        title: '',
        modalType: '',
    });
    const [fireRefetch, setFireRefetch] = useState(false);
    const [longPressedData, setLongPressedData] = useState({
        item: null,
        index: -1,
        id: -1,
    });
    const [currentModal, setCurrentModal] = useState('');
    const classes = useStyles(styles);
    const { createToast } = useToast();
    const { openBottomSheet } = useBottomSheet();

    const checkIn = async (checkingIn = true, item, eventIsDigital, index) => {
        if (!item) return;
        const ticketId = item.id;
        let response;
        if (checkingIn) {
            if (eventIsDigital) {
                response = await onCheckInVirtualEventTicket({ id: ticketId });
            } else {
                response = await onCheckInPhysicalEventTicket({
                    id: ticketId,
                    credentialsId: Math.floor(100000 + Math.random() * 900000),
                });
            }
        } else {
            response = await onUncheckEventTicket({ id: ticketId });
        }
        const text = (orderID) =>
            `Ticket Order ID#: ${orderID}, has been successfully ${
                checkingIn ? 'checked' : 'unchecked'
            } in`;
        let newTickets = tickets;
        newTickets[index].isCheckedIn = checkingIn;
        newTickets[index].isCheckInable = checkingIn ? false : true;
        newTickets[index].isUncheckInable = checkingIn ? true : false;
        newTickets[index].ticketState = checkingIn
            ? TICKET_STATE.CHECKED_IN
            : TICKET_STATE.UNCHECKED_IN;
        // newTickets[index]
        setTickets([...newTickets]);
        createToast({
            text: text(item.orderId),
            icon: 'check-circle',
            color: '#51DA9F',
            id: item.orderId + faker.datatype.uuid(),
        });
    };

    const openModal = useCallback(
        (modalType, title, item) => {
            setModalOptions({ active: true, title, modalType, item });
        },
        [longPressedData, setModalOptions]
    );

    const bottomSheetOptions = useMemo(() => {
        const { item, index } = longPressedData;
        // console.log(item);
        if (!item) return null;
        const {
            credentialsId,
            currentTicketHolder,
            generalPrice,
            hasVip,
            id,
            isActiv,
            isCheckInabl,
            isCheckedIn,
            isGenera,
            isPartiallyRefunded,
            isPendingTransfer,
            isReclaimable,
            isRefunded,
            isRevokabl,
            isRevoked,
            isSetCredentialsabl,
            isTransferrabl,
            isTransferred,
            isUncheckInable,
            isUpgradeable,
            isVip,
            orderId,
            price,
            purchasedBy,
            purchasedDatetime,
            ticketState,
            ticketType,
            vipPrice,
        } = item;
        const { qrCode } = item;
        const eventIsDigital = event.isDigital;
        const filteredOptions = filterTicketOptions(
            item,
            userType,
            event.hasEnded
        );
        const finalOptions = filteredOptions.map((title, idx) => {
            if (idx === 0 && title === 'Hide') {
                const _title = !isCheckedIn ? 'Check In' : 'Uncheck In';
                return {
                    title: _title,
                    func: () =>
                        checkIn(
                            _title === 'Check In',
                            item,
                            eventIsDigital,
                            index
                        ),
                    payload: { idx, item },
                };
            }
            // if (idx === filteredOptions.length - 1) {
            //     //
            //     return {
            //         title,
            //         func: () => expand(qrCode),
            //         payload: {},
            //     };
            // }
            return {
                title,
                func: () => onSelectAction(openModal, title, item),
                payload: { idx, item },
            };
        });
        return finalOptions;
    }, [
        onSelectModal,
        checkIn,
        openModal,
        onSelectAction,
        filterTicketOptions,
        longPressedData,
        userType,
        included,
        event,
    ]);

    const onSelectAction = useCallback(
        (openModal, title, item = null) => {
            setCurrentModal(title);
            onSelectModal(openModal, title, item);
        },
        [onSelectModal, setCurrentModal]
    );

    const modalProps = useMemo(() => {
        if (modalsInfo[currentModal] === undefined) return {};
        return modalsInfo[currentModal];
    }, [currentModal]);

    useEffect(() => {
        if (!longPressedData.item) return;
        openBottomSheet('ticketManagementOptions', bottomSheetOptions);
    }, [longPressedData]);

    const toggle = (payload) => {
        if (payload === 'tickets') {
            return (ticketsActive.value = !ticketsActive.value);
        } else if (payload === 'overview') {
            return (overviewActive.value = !overviewActive.value);
        } else if (payload === 'surveys') {
            return (surveysActive.value = !surveysActive.value);
        }
    };
    const ticketsActive = useSharedValue(false);
    const overviewActive = useSharedValue(false);
    const surveysActive = useSharedValue(false);
    const { ticketsChevronStyle, overviewChevronStyle, surveyChevronStyle } =
        useAnimatedClasses(animatedStyles, {
            ticketsActive,
            overviewActive,
            surveysActive,
        });

    const fetchNewTerm = async () => {
        setFetchingTerm(true);
        const response = await kwivrrApi.getEventHostTickets({
            eventId,
            page: 1,
            term,
            scope: 'host',
        });
        setTickets([...response.entries]);
        setFetchingTerm(false);
        refresh();
    };

    const searchNewTerm = useCallback(
        debounce((text) => {
            if (initialSearch) {
                setTerm(text);
            }
        }, 700),
        [initialSearch, setTerm]
    );

    useEffect(() => {
        if (initialSearch) {
            fetchNewTerm();
        }
    }, [term]);

    useEffect(() => {
        if (initialSearch) {
            searchNewTerm(search);
        }
        if (search.length > 0) {
            setInitialSearch(true);
        }
    }, [search, initialSearch, setInitialSearch]);

    useEffect(() => {
        if (fireRefetch) {
            setFireRefetch(false);
            dataRefetchToPage();
        }
    }, [fireRefetch, dataRefetchToPage, dataRefetch, setFireRefetch]);

    return (
        <React.Fragment>
            <View style={classes.container}>
                <ScrollView
                    style={{ flex: 1 }}
                    showsVerticalScrollIndicator={false}
                >
                    <Header
                        isHost
                        comingFrom={comingFrom}
                        comingFromManagement={comingFromManagement}
                        openModal={(title, item) =>
                            onSelectAction(openModal, title, item)
                        }
                        openEventManagerModal={() => setEventManagerModal(true)}
                        eventId={eventId}
                    />
                    <ChevronHeader
                        title="Overview"
                        style={overviewChevronStyle}
                        toggleKey="overview"
                        toggle={toggle}
                        containerStyle={{ marginTop: 24 }}
                    />
                    <Accordion active={overviewActive}>
                        <Overview eventId={eventId} fireRefetch={fireRefetch} />
                    </Accordion>
                    {/* <ChevronHeader
                        title="Surveys"
                        style={surveyChevronStyle}
                        toggleKey="surveys"
                        toggle={toggle}
                    /> */}
                    {/* <Accordion active={surveysActive}>
                        <Surveys openNewSurveyModal={openNewSurveyModal} />
                    </Accordion> */}
                    {/* <Divider style={classes.divider} /> */}
                    {includeTickets ? (
                        <React.Fragment>
                            <ChevronHeader
                                title="Tickets"
                                style={ticketsChevronStyle}
                                toggleKey="tickets"
                                toggle={toggle}
                            />
                            <Accordion active={ticketsActive}>
                                <Tickets
                                    setLongPressedData={setLongPressedData}
                                    data={tickets}
                                    isLoading={isLoading}
                                    fetchingOver={fetchingOver}
                                    page={page}
                                    onEndReached={onEndReached}
                                    refresh={refresh}
                                    search={search}
                                    setSearch={setSearch}
                                />
                            </Accordion>
                        </React.Fragment>
                    ) : (
                        <View style={{ padding: 24 }}>
                            <TextRegular>
                                There are no sold tickets yet.
                            </TextRegular>
                        </View>
                    )}
                </ScrollView>
            </View>

            {modalOptions.active && (
                <KwivrrModal
                    title={
                        modalOptions.title === 'View Ticket'
                            ? ''
                            : modalOptions.title
                    }
                    inNavigation
                    modalStyle={{ height: '96%' }} // ticketHistory
                    modalInnerStyle={{
                        paddingVertical: 30,
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                    }} // ticketHistory
                    usingScrollView={true} // Upgrade: true, Transfer: false, Reclaim: false, Force: true, AssingCredentialID: false, cancelticket: false, viewTicket: false, ticketHistory: true
                    scrollViewKeyboard={false} // Upgrade: true, transfer : false, Reclaim: false, Force: true, AssingCredentialID: false, cancelTicket: false, viewTicket: false, ticketHistory: false
                    absoluteCloseButton={true} // only view history is false
                    {...modalProps}
                    close={() =>
                        setModalOptions((prev) => ({ ...prev, active: false }))
                    }
                >
                    <Modal
                        eventId={eventId}
                        ticket={longPressedData.item}
                        type={modalOptions.modalType}
                        ticketId={longPressedData.id}
                        ticketIndex={longPressedData.index}
                        setTickets={setTickets}
                        setFireRefetch={setFireRefetch}
                        refetch={dataRefetchToPage}
                    />
                </KwivrrModal>
            )}
            {scannerOpen && (
                <KwivrrModal close={() => setScannerOpen(false)}>
                    <Scanner
                        checkIn={checkIn}
                        findTicket={(text) => setSearch(text)}
                    />
                </KwivrrModal>
            )}
            {eventManagerModal && (
                <KwivrrModal
                    absoluteCloseButton
                    title={'Invite Admins'}
                    close={() => setEventManagerModal(false)}
                    usingScrollView={false}
                >
                    <EventManager eventId={eventId} />
                </KwivrrModal>
            )}
            {!event.hasEnded && (
                <View style={{ position: 'absolute', bottom: 10, right: 10 }}>
                    <TouchableOpacity onPress={() => setScannerOpen(true)}>
                        <View
                            style={{
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: palette.button.primary,
                                padding: 18,
                                borderRadius: 100,
                            }}
                        >
                            <KwivrrIcon name="grid" color="#FFFFFF" />
                        </View>
                    </TouchableOpacity>
                </View>
            )}
        </React.Fragment>
    );
}

export default Host;
