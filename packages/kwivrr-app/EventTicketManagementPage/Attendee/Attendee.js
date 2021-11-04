import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, ScrollView, View } from 'react-native';
import PropTypes from 'prop-types';
import InputComponent from 'kwivrr-ui/InputComponent';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Header from '../Header';
import PaymentInfo from './PaymentInfo';
import arraySearchFilter from 'kwivrr-common/arraySearchFilter';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import Modal from '../Modal/Modal';
import { onSelectModal, modalsInfo, _ticketData } from '../utils';
import { AUTH_STATE } from 'kwivrr-common/AuthContext';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import AuthButton from 'kwivrr-ui/AuthButton';
import useTheme from 'kwivrr-hooks/useTheme';
import BuyTicket from 'kwivrr-ui/BuyTicket';
import { defaultDateFormat } from 'kwivrr-common/dateFormats';
import useIsFutureEvent from 'kwivrr-hooks/useIsFutureEvent';
import useInfiniteScroll from 'kwivrr-hooks/useInfiniteScroll';
import kwivrrApi from 'kwivrr-common/sdk';
import { debounce } from 'lodash';

function Attendee({
    event,
    comingFromManagement,
    comingFrom,
    eventStartDatetime,
    eventImage,
    hostName,
    hostId,
    hostAvatar,
    apiTickets,
    eventId,
    refetch,
    listSummary,
}) {
    const [term, setTerm] = useState('');
    const [fetchingTerm, setFetchingTerm] = useState(false);
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
            const response = await kwivrrApi.getEventGuestTickets({
                eventId,
                page: pageFrom === null ? page + 1 : pageFrom,
                term,
            });
            const toReturn = {
                entries: response.entries,
                hasMore: response.listSummary.hasMore,
            };
            return toReturn;
        },
        initialData: apiTickets,
    });

    const fetchNewTerm = async () => {
        setFetchingTerm(true);
        const response = await kwivrrApi.getEventGuestTickets({
            eventId,
            page: 1,
            term,
        });
        setTickets([...response.entries]);
        setFetchingTerm(false);
        refresh();
    };
    const classes = useStyles(styles);
    const { palette } = useTheme();
    const [fireRefetch, setFireRefetch] = useState(false);
    // const { data, setData: setTickets } = useFetch(fetchAttendeeData);
    const [currentTicketId, setCurrentTicketId] = useState(null);
    const [buyTicketModal, setBuyTicketModal] = useState(false);
    const [ticketSelected, setTicketSelected] = useState({
        index: -1,
        ticket: null,
    });
    const [modalOptions, setModalOptions] = useState({
        active: false,
        title: '',
        modalType: '',
        modalInfo: '',
    });
    const [search, setSearch] = useState('');

    const openModal = (modalType, title, payload = {}) => {
        setModalOptions((prev) => ({
            ...prev,
            active: true,
            title,
            modalType,
        }));
    };

    const selectModal = (value, ticketId, ticket, index) => {
        setTicketSelected({ ticket, index });
        setCurrentTicketId(ticketId);
        setModalOptions((prev) => ({ ...prev, modalInfo: value }));
        onSelectModal(openModal, value);
    };

    const modalProps = useMemo(() => {
        if (modalsInfo[modalOptions.modalInfo] === undefined) return {};
        return modalsInfo[modalOptions.modalInfo];
    }, [modalOptions.modalInfo]);

    const { userIsLogged, setAuthState } = useAuthCredentials();
    useEffect(() => {
        if (!userIsLogged) {
            setTimeout(() => {
                setAuthState(AUTH_STATE.LOGIN_IN);
            }, 500);
        }
    }, []);

    const searchNewTerm = useCallback(
        debounce((text) => {
            setTerm(text);
        }, 700),
        []
    );

    useEffect(() => {
        fetchNewTerm();
    }, [term]);

    useEffect(() => {
        searchNewTerm(search);
    }, [search]);

    useEffect(() => {
        if (fireRefetch) {
            setFireRefetch(false);
            dataRefetchToPage();
        }
    }, [fireRefetch, dataRefetchToPage, dataRefetch, setFireRefetch]);

    const renderTickets = useMemo(() => {
        return [...tickets, { id: 'buyTicketsButton' }];
    }, [tickets]);

    useEffect(() => {}, []);

    return (
        <View style={classes.container}>
            <View style={classes.contentContainer}>
                <Header
                    eventImage={eventImage}
                    eventId={eventId}
                    event={event}
                    hostId={hostId}
                    hostName={hostName}
                    avatar={hostAvatar}
                    comingFrom={comingFrom}
                    comingFromManagement={comingFromManagement}
                />
                <InputComponent
                    onChange={(text) => {
                        setSearch(text);
                    }}
                    value={search}
                    style={classes.inputContainer}
                    inputStyle={classes.inputStyle}
                    style={classes.input}
                    iconLeft="search"
                    placeholder={`Search ${tickets.length} ticket${
                        tickets.length > 1 ? 's' : ''
                    }`}
                />
                {fetchingTerm ? (
                    <View style={classes.innerContainerPlaceholder}>
                        {new Array(3).fill(null).map((_, index) => (
                            <View
                                key={index}
                                style={classes.ticketPlaceholder}
                            />
                        ))}
                    </View>
                ) : (
                    <View style={{ flex: 1, width: '90%' }}>
                        <FlatList
                            style={classes.scrollView}
                            contentContainerStyle={
                                classes.contentContainerScrollView
                            }
                            data={renderTickets}
                            keyExtractor={({ id }) => String(id)}
                            renderItem={({ item, index }) => {
                                if (item.id === 'buyTicketsButton') {
                                    if (event.hasEnded) return null;
                                    return (
                                        <AuthButton
                                            onPress={() =>
                                                setBuyTicketModal(true)
                                            }
                                            buttonStyle={classes.buttonStyle}
                                            textFontSize={20}
                                            textColor={palette.common.white}
                                            backgroundColor={
                                                palette.button.primary
                                            }
                                        >
                                            Buy more tickets
                                        </AuthButton>
                                    );
                                }
                                return (
                                    <PaymentInfo
                                        index={index}
                                        ticket={item}
                                        selectModal={selectModal}
                                        eventId={eventId}
                                        refetch={refetch}
                                    />
                                );
                            }}
                            onEndReached={onEndReached}
                            onEndReachedThreshold={0.4}
                            onRefresh={refetch}
                            refreshing={isLoading}
                            ListFooterComponent={() => {
                                if (!isLoading || fetchingOver) return null;
                                return (
                                    <View style={classes.footer}>
                                        <ActivityIndicator
                                            size="small"
                                            color="tomato"
                                        />
                                    </View>
                                );
                            }}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                )}
            </View>
            {modalOptions.active && (
                <KwivrrModal
                    title={
                        modalOptions.title === 'View Ticket'
                            ? ''
                            : modalOptions.title
                    }
                    inNavigation
                    modalStyle={{ ...classes.modalOptionsStyle }} // ticketHistory
                    modalInnerStyle={{ ...classes.modalOptionsInnerStyle }} // ticketHistory
                    usingScrollView={true} // Upgrade: true, Transfer: false, Reclaim: false, Force: true, AssingCredentialID: false, cancelticket: false, viewTicket: false, ticketHistory: true
                    scrollViewKeyboard={false} // Upgrade: true, transfer : false, Reclaim: false, Force: true, AssingCredentialID: false, cancelTicket: false, viewTicket: false, ticketHistory: false
                    absoluteCloseButton={true} // only view history is false
                    {...modalProps}
                    close={() =>
                        setModalOptions((prev) => ({ ...prev, active: false }))
                    }
                >
                    <Modal
                        ticket={ticketSelected.ticket}
                        ticketIndex={ticketSelected.index}
                        setTickets={setTickets}
                        ticketId={currentTicketId}
                        type={modalOptions.modalType}
                        eventId={eventId}
                        setFireRefetch={setFireRefetch}
                        refetch={dataRefetchToPage}
                    />
                </KwivrrModal>
            )}
            {buyTicketModal && (
                <KwivrrModal
                    absoluteCloseButton
                    modalStyle={{ ...classes.modalStyle }}
                    innerModalStyle={classes.kwivrrModalInnerModalStyle}
                    close={() => setBuyTicketModal(false)}
                    scrollViewKeyboard={true}
                >
                    <BuyTicket
                        eventId={event.id}
                        eventIndex={-1}
                        event={event}
                        setEvents={setTickets}
                        from="attendee"
                        onAlertPress={dataRefetchToPage}
                    />
                </KwivrrModal>
            )}
        </View>
    );
}

Attendee.propTypes = {
    // event: PropTypes.shape({
    //     eventName: PropTypes.string.isRequired,
    //     eventStartDatetime: PropTypes.string.isRequired,
    //     eventImage: PropTypes.string,
    //     hostAvatar: PropTypes.string,
    // }),
};

export default Attendee;
