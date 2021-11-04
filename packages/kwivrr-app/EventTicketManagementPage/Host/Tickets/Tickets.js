import React, { useMemo } from 'react';
import { ActivityIndicator, ScrollView, View } from 'react-native';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import useQRCode from 'kwivrr-hooks/useQRCode';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from '../styles';
import useToast from 'kwivrr-hooks/useToast';
import arraySearchFilter from 'kwivrr-common/arraySearchFilter';
import { modalsInfo, onSelectModal, _ticketData } from '../../utils';
import { filterTicketOptions, isCheckedInCancelledOrCredited } from '../util';
import InputComponent from 'kwivrr-ui/InputComponent';
import TableContent from '../TableContent/';
import Table from 'kwivrr-ui/Table';
import useDimensions from 'kwivrr-hooks/useDimensions';
import isCloseToBottom from 'kwivrr-common/isCloseToBottom';

const HEADERS = [
    {
        key: 'orderId',
        label: 'Order ID #',
        styling: 'orderIDColumn',
        button: true,
    },
    {
        key: 'currentTicketHolder',
        label: 'Ticket Holder',
        styling: 'ticketHolderColumn',
        button: true,
    },
    {
        key: 'ticketState',
        label: 'Ticket Status',
        styling: 'ticketStatusColumn',
        button: true,
    },
    // {
    //     key: 'gifted_user_email',
    //     label: 'Purchased By',
    //     styling: 'purchasedByColumn',
    //     button: true,
    // },
    {
        key: 'purchasedDatetime',
        label: 'Purchased Date / Time',
        styling: 'purchasedDateTimeColumn',
        button: true,
    },
    {
        key: 'ticketType',
        label: 'Ticket Type',
        styling: 'ticketTypeColumn',
        button: true,
    },
    {
        key: 'price',
        label: 'Ticket Cost',
        styling: 'ticketPriceColumn',
        button: true,
    },
    {
        key: 'credentialsId',
        label: 'Credential ID',
        styling: 'credentialIDColumn',
        button: true,
    },
];

function Tickets({
    data,
    setLongPressedData,
    isLoading,
    onEndReached,
    search,
    setSearch,
    ...rest
}) {
    const { screenWidth } = useDimensions();
    const { expand } = useQRCode();
    const { userType } = useAuthCredentials();
    const classes = useStyles(styles);

    const _openBottomSheet = (payload) => {
        const { item, index } = payload;
        setLongPressedData({ item, index, id: item.id });
    };

    const filteredData = useMemo(() => {
        if (!data) return null;
        return data;
    }, [data, search]);

    return (
        <View style={{ flex: 1 }}>
            <InputComponent
                value={search}
                onChangeText={(text) => setSearch(text)}
                placeholder={`Search ${data.length} ticket${
                    data.length > 1 ? 's' : ''
                }`}
                style={classes.inputStyleContainer}
                inputStyle={classes.inputStyle}
            />
            {filteredData && (
                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        width: '100%',
                        marginTop: 12,
                        width: screenWidth,
                        marginLeft: -screenWidth * 0.06,
                        maxHeight: 380,
                    }}
                >
                    <ScrollView
                        showsVerticalScrollIndicator={true}
                        style={{ flex: 1 }}
                        onScroll={({ nativeEvent }) => {
                            if (isCloseToBottom(nativeEvent)) {
                                onEndReached();
                            }
                        }}
                        scrollEventThrottle={400}
                    >
                        <TableContent>
                            <Table
                                pressableItems
                                onLongPress={(response) =>
                                    _openBottomSheet(response)
                                }
                                data={data}
                                headers={HEADERS}
                                classes={classes}
                                headerRowStyle={{ height: 50 }}
                                dataRowStyle={{
                                    height: 50,
                                    borderBottomColor: '#F0F0F0',
                                    borderBottomWidth: 2,
                                }}
                                {...rest}
                            />
                        </TableContent>
                        {isLoading && (
                            <View
                                style={{
                                    width: '100%',
                                    paddingVertical: 18,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <ActivityIndicator
                                    color="tomato"
                                    size="small"
                                />
                            </View>
                        )}
                    </ScrollView>
                    {isLoading && (
                        <View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: 'rgba(255, 255, 255, 0.6)',
                            }}
                        >
                            <ActivityIndicator size="small" color="tomato" />
                        </View>
                    )}
                </View>
            )}
        </View>
    );
}

export default Tickets;
