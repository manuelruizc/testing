import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import useDimensions from 'kwivrr-hooks/useDimensions';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from '../styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import Picker from 'kwivrr-ui/Picker';
import InputComponent from 'kwivrr-ui/InputComponent';

function Inputs({
    setSearch,
    setPickerActive,
    setPickerValue,
    pickerValue,
    pickerState,
    onSelectAction,
}) {
    const classes = useStyles(styles);

    const { screenWidth } = useDimensions();

    return (
        <View
            style={{
                width: screenWidth,
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: screenWidth * 0.03,
            }}
        >
            <View
                style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {Platform.OS === 'ios' && (
                    <TouchableOpacity
                        onPress={() => setPickerActive(true)}
                        style={{
                            ...classes.inputStyle,
                            width: '48.5%',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}
                    >
                        <TextRegular size={16}>{pickerValue}</TextRegular>
                        <KwivrrIcon name="chevron-down" size={20} />
                    </TouchableOpacity>
                )}
                {Platform.OS === 'android' && (
                    <View
                        style={{
                            ...classes.inputStyle,
                            width: '48.5%',
                            paddingHorizontal: 0,
                        }}
                    >
                        <Picker
                            // pickerState={pickerState}
                            // setPickerActive={setPickerActive}
                            // items={pickerItems}
                            style={{
                                width: '100%',
                                height: '100%',
                                color: 'black',
                            }}
                            mode="dialog"
                            onValueChange={(value) => {
                                setPickerValue(value);
                                onSelectAction(value);
                            }}
                        />
                    </View>
                )}
                <InputComponent
                    onChange={(text) => {
                        setSearch(text);
                    }}
                    style={{ width: '48.5%' }}
                    inputStyle={{ ...classes.inputStyle, fontSize: 16 }}
                    placeholder="Search tickets"
                    iconLeft="search"
                />
            </View>
        </View>
    );
}

Inputs.propTypes = {
    setSearch: PropTypes.func.isRequired,
};

export default Inputs;
