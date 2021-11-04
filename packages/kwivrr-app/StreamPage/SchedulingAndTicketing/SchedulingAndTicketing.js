import React, { useState, useEffect, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import DatePicker from 'kwivrr-ui/DatePicker';
import {
    DoubleTextInputContainer,
    SharedSwitch,
    SmallDatePicker,
} from '../shared';
import TextRegular from 'kwivrr-ui/TextRegular';
import Animated, { runOnJS, useSharedValue } from 'react-native-reanimated';
import useAnimatedClasses from 'kwivrr-hooks/useAnimatedClasses';
import animatedStyles from './animatedStyles';
import TicketsInfo from './TicketsInfo';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import useTheme from 'kwivrr-hooks/useTheme';
import BankingInformation from 'kwivrr-ui/BankingInformation/BankingInformation';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import Payment from 'kwivrr-ui/Payments/Payment';

function SchedulingAndTicketing({ active, formOptions }) {
    const {
        handleChange,
        setFieldValue,
        handleSubmit,
        setFieldTouched,
        errors,
        touched,
        values: formValues,
    } = formOptions;

    const classes = useStyles(styles);
    const { palette } = useTheme();
    const [layoutDone, setLayoutDone] = useState(false);
    const [bankingInformationModal, setBankingInformationModal] =
        useState(false);
    const ticketsHeight = useSharedValue(0);
    const [totalHeight, setTotalHeight] = useState(0);
    const { style } = useAnimatedClasses(
        animatedStyles,
        { active, ticketsActive: formValues.isTicketed, ticketsHeight },
        { totalHeight, layoutDone }
    );

    const onLayout = (event) => {
        if (layoutDone) return;
        const { height: _height } = event.nativeEvent.layout;
        setLayoutDone(true);
        runOnJS(setTotalHeight)(_height);
    };

    const onTicketLayout = (event) => {
        const { height: _height } = event.nativeEvent.layout;
        ticketsHeight.value = _height;
    };

    const [currentKey, setCurrentKey] = useState('');
    const showDatePicker = (key) => {
        setCurrentKey(key);
        setIsVisible(true);
    };

    const minimumDate = useMemo(() => {
        if (currentKey === 'startTime') {
            return undefined;
        } else if (currentKey === 'endTime') {
            return new Date(formValues.startTime);
        } else if (currentKey === 'publish') {
            return new Date();
        } else {
            return undefined;
        }
    }, [currentKey, formValues]);

    const maximumDate = useMemo(() => {
        if (currentKey === 'startTime') {
            return undefined;
        } else if (currentKey === 'endTime') {
            return undefined;
        } else if (currentKey === 'publish') {
            return formValues.startTime
                ? new Date(formValues.startTime)
                : undefined;
        } else {
            return undefined;
        }
    }, [currentKey, formValues]);

    const hideDatePicker = () => {
        setIsVisible(false);
    };

    const handleConfirm = (date) => {
        console.log(date);
        const datee = date.toString();
        setFieldValue(currentKey, datee);
        hideDatePicker();
    };
    const [isVisible, setIsVisible] = useState(false);

    const datePickerProps = useMemo(() => {
        return {
            minimumDate,
            maximumDate,
        };
    }, [minimumDate, maximumDate]);

    return (
        <React.Fragment>
            <DatePicker
                isVisible={isVisible}
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                // minimumDate={new Date()}
                date={new Date()}
                // {...datePickerProps}
            />
            <Animated.View onLayout={onLayout} style={style}>
                {/* <SharedSwitch
                    value={formValues.customTimezone}
                    label="Custom Time"
                    onValueChange={(value) =>
                        setFieldValue('customTimezone', value)
                    }
                /> */}
                <DoubleTextInputContainer>
                    <SmallDatePicker
                        id="startTime"
                        onPress={() => showDatePicker('startTime')}
                        formValues={formValues}
                        label="Scheduled Start Time"
                        style={{ width: '47%' }}
                        onPressEmpty={() => setFieldValue('startTime', null)}
                    />
                    <SmallDatePicker
                        id="endTime"
                        onPress={() => showDatePicker('endTime')}
                        formValues={formValues}
                        label="Scheduled End time"
                        style={{ width: '47%' }}
                        onPressEmpty={() => setFieldValue('endTime', null)}
                    />
                </DoubleTextInputContainer>
                <DoubleTextInputContainer>
                    <SmallDatePicker
                        id="publish"
                        onPress={() => showDatePicker('publish')}
                        formValues={formValues}
                        label="Publish"
                        style={{ width: '47%' }}
                        onPressEmpty={() => setFieldValue('publish', null)}
                    />
                    <SmallDatePicker
                        id="archive"
                        onPress={() => showDatePicker('archive')}
                        formValues={formValues}
                        label="Archive"
                        style={{ width: '47%' }}
                        onPressEmpty={() => setFieldValue('archive', null)}
                    />
                </DoubleTextInputContainer>
                <SharedSwitch
                    value={formValues.hasCountdown}
                    label="Event Countdown"
                    onValueChange={(value) =>
                        setFieldValue('hasCountdown', value)
                    }
                />
                <View style={classes.ticketsRow}>
                    <SharedSwitch
                        value={formValues.isTicketed}
                        label="Tickets"
                        onValueChange={(value) =>
                            setFieldValue('isTicketed', value)
                        }
                        // disabled={formValues.isInPerson}
                    />
                    {/* {!formValues.paymentAccount && (
                        <TouchableOpacity
                            onPress={() => setBankingInformationModal(true)}
                        >
                            <TextRegular
                                style={classes.addBankText}
                                color={palette.button.primary}
                            >
                                + Add Bank Information
                            </TextRegular>
                        </TouchableOpacity>
                    )} */}
                </View>
                <View style={{ width: '100%' }} onLayout={onTicketLayout}>
                    {formValues.paymentAccount && (
                        <Payment
                            paymentOption={formValues.paymentAccount}
                            pressable={false}
                            customDeleteOption={() =>
                                setFieldValue('paymentAccount', null)
                            }
                            fullPaymentWidth
                        />
                    )}
                    {formValues.isTicketed && (
                        <TicketsInfo
                            setFieldValue={setFieldValue}
                            values={formValues}
                            handleChange={handleChange}
                        />
                    )}
                </View>
            </Animated.View>
            {bankingInformationModal && (
                <KwivrrModal
                    absoluteCloseButton
                    usingScrollView={false}
                    title={'Add Banking Information'}
                    close={() => setBankingInformationModal(false)}
                >
                    <BankingInformation
                        getAccounts
                        onSave={(values) => {}}
                        onSelect={(option) =>
                            setFieldValue('paymentAccount', option)
                        }
                        deleteOption={false}
                        addAccountLocally
                    />
                </KwivrrModal>
            )}
        </React.Fragment>
    );
}

export default SchedulingAndTicketing;
