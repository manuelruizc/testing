import React, { useState } from 'react';
import { Platform } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

function DatePicker(props) {
    const isAndroid = Platform.OS === 'android';
    const { ...rest } = props;
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [mode, setMode] = useState('datetime');

    return (
        <DateTimePickerModal
            mode={mode}
            textColor="black"
            themeVariant="light"
            display={isAndroid ? 'default' : 'spinner'}
            {...props}
        />
    );
}

export default DatePicker;
