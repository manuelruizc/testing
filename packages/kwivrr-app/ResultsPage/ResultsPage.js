import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, View } from 'react-native';
import faker from 'faker';
import { shuffle } from 'lodash';
import useStyles from 'kwivrr-hooks/useStyles';
import Searchbar from 'kwivrr-ui/Searchbar';
import styles from './styles';
import useSearch from 'kwivrr-hooks/useSearch';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { createData } from '../HomePage/playground/data';
import { useIsFocused } from '@react-navigation/native';
import { useDropdowns } from 'kwivrr-common/MiniModalsContext';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import LoadingUI from 'kwivrr-ui/LoadingUI';
import useDimensions from 'kwivrr-hooks/useDimensions';
import TopOptions from './TopOptions/TopOptions';
import UserAndEvents from './UserAndEvents';
import AttendeeHistoryReport from './AttendeeHistoryReport/AttendeeHistoryReport';
import UserManagement from './UserManagement';
import DatePicker from 'kwivrr-ui/DatePicker';
import InputDatePickerSelector from 'kwivrr-ui/InputDatePickerSelector';
import moment from 'moment';
import useTheme from 'kwivrr-hooks/useTheme';

const users = [
    {
        id: 12312425345,
        username: 'Trang Coffeelife',
        bio: 'just drinking coffee & living life',
        avatar: 'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1498&q=80',
    },
    {
        id: 123112352425345,
        username: 'Trang Coffeelife',
        bio: 'just drinking coffee & living life',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
    },
    {
        id: 1277846312425345,
        username: 'Trang Coffeelife',
        bio: 'just drinking coffee & living life',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80',
    },
];
const attendee = [
    {
        name: 'Jim Peterson',
        userID: '123123',
        purchaserEmail: 'jimpeterson@gmail.com',
    },
    {
        name: 'Kelly Rodson',
        userID: '888997',
        purchaserEmail: 'kellyrodson@gmail.com',
    },
    {
        name: 'Karl Stevens',
        userID: '13444',
        purchaserEmail: 'karlstevens22@gmail.com',
    },
    {
        name: 'Jennifer Woods',
        userID: '1234',
        purchaserEmail: 'jenniwoods88@gmail.com',
    },
];
const purchasers = [
    {
        purchaserFirstName: 'Jim',
        purchaserLastName: 'Peterson',
        purchaserEmail: 'jimpeterson@gmail.com',
        purchaserUserID: '1234324',
        attendeeFirstName: 'Jim',
        attendeeLastName: 'Peterson',
        attendeeEmail: 'jimpeterson@gmail.com',
        attendeeUserID: '1234324',
        hostName: 'Jordyn Gardiner',
        hostEmai: 'jordyngardiner@gmail.com',
        eventID: '812312',
        eventName: 'Marketing Techniques 101',
        ticketType: 'General',
        ticketPrice: '$10.00',
        preferredLanguage: 'English',
    },
    {
        purchaserFirstName: 'Jim',
        purchaserLastName: 'Peterson',
        purchaserEmail: 'jimpeterson@gmail.com',
        purchaserUserID: '1234324',
        attendeeFirstName: 'Jim',
        attendeeLastName: 'Peterson',
        attendeeEmail: 'jimpeterson@gmail.com',
        attendeeUserID: '1234324',
        hostName: 'Jordyn Gardiner',
        hostEmai: 'jordyngardiner@gmail.com',
        eventID: '812312',
        eventName: 'Marketing Techniques 101',
        ticketType: 'General',
        ticketPrice: '$10.00',
        preferredLanguage: 'English',
    },
    {
        purchaserFirstName: 'Aaron',
        purchaserLastName: 'Dodson',
        purchaserEmail: 'jimpeterson@gmail.com',
        purchaserUserID: '1234324',
        attendeeFirstName: 'Jim',
        attendeeLastName: 'Peterson',
        attendeeEmail: 'jimpeterson@gmail.com',
        attendeeUserID: '1234324',
        hostName: 'Jordyn Gardiner',
        hostEmai: 'jordyngardiner@gmail.com',
        eventID: '812312',
        eventName: 'Marketing Techniques 101',
        ticketType: 'General',
        ticketPrice: '$10.00',
        preferredLanguage: 'English',
    },
    {
        purchaserFirstName: 'Ron',
        purchaserLastName: 'Winkinson',
        purchaserEmail: 'jimpeterson@gmail.com',
        purchaserUserID: '1234324',
        attendeeFirstName: 'Jim',
        attendeeLastName: 'Peterson',
        attendeeEmail: 'jimpeterson@gmail.com',
        attendeeUserID: '1234324',
        hostName: 'Jordyn Gardiner',
        hostEmail: 'jordyngardiner@gmail.com',
        eventID: '812312',
        eventName: 'Marketing Techniques 101',
        ticketType: 'General',
        ticketPrice: '$10.00',
        preferredLanguage: 'English',
    },
];

function ResultsPage(props) {
    const classes = useStyles(styles);
    const { palette } = useTheme();
    const { searchTerm, setSearchTerm } = useSearch('');
    const { userIsLogged } = useAuthCredentials();
    const [data, setData] = useState(null);
    const [attendeeData, setAttendeeData] = useState([]);
    const [userManagementData, setUserManagementData] = useState([]);
    const isFocused = useIsFocused();
    const { unmountSearchbar } = useDropdowns();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const [pickerActive, setPickerActive] = useState('');

    const { screenWidth } = useDimensions();
    const translateX = useSharedValue(0);

    const setNewSearch = () => {
        const eventsIndex = faker.datatype.boolean();
        const usersIndex = faker.datatype.boolean();
        setData(null);
        setTimeout(() => {
            setData({
                users: eventsIndex ? shuffle(users) : shuffle(users),
                events: usersIndex
                    ? shuffle(createData(!userIsLogged))
                    : shuffle(createData(!userIsLogged)),
            });
        }, 800);
    };

    const borderState = useMemo(() => {
        if (!fromDate.length || !toDate.length) return 'transparent';
        if (moment(fromDate).diff(toDate) > 0) {
            return 'tomato';
        }
        return palette.button.primary;
    }, [toDate, fromDate]);

    const search = (_searchTerm) => {
        if (selectedIndex === 0) {
            setData(null);
            setTimeout(() => {
                setNewSearch();
            }, 1100);
        } else if (selectedIndex === 1) {
            if (moment(fromDate).diff(toDate) > 0) {
                return Alert.alert(
                    'Date error',
                    'Your start date should be lower than your to date'
                );
            }
            setAttendeeData(null);
            setTimeout(() => {
                setAttendeeData([...attendee]);
            }, 1100);
        } else {
            setUserManagementData(null);
            setTimeout(() => {
                setUserManagementData([...purchasers]);
            }, 1100);
        }
    };
    useEffect(() => {
        if (isFocused) {
            setNewSearch();
            unmountSearchbar();
        } else {
            setData(null);
        }
    }, [isFocused]);

    useEffect(() => {
        if (data || attendeeData || userManagementData) {
            // fix this
            //     translateX.value = withTiming(0, {
            //         easing: Easing.inOut(Easing.ease),
            //         duration: 500,
            //     });
        }
    }, [data, attendeeData, userManagementData]);

    const scrollViewContainerStyle = useAnimatedStyle(() => {
        return {
            flex: 1,
            width: '100%',
            transform: [{ translateX: translateX.value }],
        };
    });

    const placeholder = useMemo(() => {
        if (selectedIndex === 0) {
            return 'Search by User or Event Title';
        } else if (selectedIndex === 1) {
            return 'Search by Email or User ID';
        }
        return 'Search by Name, Email or User ID';
    }, [selectedIndex]);

    useEffect(() => {
        setSearchTerm('');
    }, [selectedIndex, setSearchTerm]);

    const showDatePicker = (picker) => {
        setPickerActive(picker);
        setIsVisible(true);
    };

    const handleConfirm = (date) => {
        const dateString = date.toString();
        if (pickerActive === 'start') {
            setFromDate(dateString);
        } else {
            setToDate(dateString);
        }
        setIsVisible(false);
    };

    // if (
    //     (selectedIndex === 0 && !data) ||
    //     (selectedIndex === 1 && !attendeeData) ||
    //     (selectedIndex === 2 && !userManagementData)
    // ) {
    //     return (
    //         <View style={{ ...classes.container }}>
    //             <TopOptions
    //                 selectedIndex={selectedIndex}
    //                 setSelectedIndex={setSelectedIndex}
    //             />
    //             <View style={classes.inputContainer}>
    //                 <Searchbar
    //                     editable={false}
    //                     value={searchTerm}
    //                     style={classes.searchbar}
    //                 />
    //             </View>
    //             <View style={{ flex: 1, width: '100%' }}>
    //                 <LoadingUI />
    //             </View>
    //         </View>
    //     );
    // }

    return (
        <View style={classes.container}>
            {/* <TopOptions
                selectedIndex={selectedIndex}
                setSelectedIndex={setSelectedIndex}
            /> */}
            <View style={classes.inputContainer}>
                <Searchbar
                    editable
                    placeholder={placeholder}
                    onChangeText={(text) => setSearchTerm(text)}
                    value={searchTerm}
                    onSubmitEditing={({ nativeEvent: { text } }) =>
                        search(text)
                    }
                    style={classes.searchbar}
                />
                {selectedIndex === 1 && (
                    <View style={classes.inputDatePickers}>
                        <InputDatePickerSelector
                            value={fromDate}
                            style={classes.inputDatePicker}
                            onPress={() => showDatePicker('start')}
                            dateFormatted={false}
                            placeholder="00/00/0000 00:00:00'"
                            borderState={borderState}
                        />
                        <InputDatePickerSelector
                            value={toDate}
                            style={classes.inputDatePicker}
                            onPress={() => showDatePicker('end')}
                            dateFormatted={false}
                            placeholder="00/00/0000 00:00:00'"
                            borderState={borderState}
                        />
                    </View>
                )}
            </View>
            <Animated.View style={scrollViewContainerStyle}>
                <ResultOption
                    searchTerm={searchTerm}
                    data={data}
                    attendeeData={attendeeData}
                    userManagementData={userManagementData}
                    selectedIndex={selectedIndex}
                />
            </Animated.View>
            <DatePicker
                isVisible={isVisible}
                onConfirm={handleConfirm}
                mode="datetime"
                onCancel={() => setIsVisible(false)}
            />
        </View>
    );
}

function ResultOption({
    data,
    attendeeData,
    userManagementData,
    selectedIndex,
    searchTerm,
}) {
    if (selectedIndex === 0) {
        return <UserAndEvents data={data} searchTerm={searchTerm} />;
    }
    if (selectedIndex === 1) {
        return <AttendeeHistoryReport data={attendeeData} />;
    }
    return <UserManagement data={userManagementData} />;
}

export default ResultsPage;
