import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from '../TextRegular';
import { formatDate } from 'kwivrr-common/dateFormats';

function InputDatePickerSelector({
    value,
    label,
    placeholder = '',
    dateFormatted = true,
    style,
    borderState = null,
    ...rest
}) {
    const classes = useStyles(styles, { label });
    return (
        <View style={style}>
            <View style={classes.smallDatePickerLabelContainer}>
                {label && (
                    <TextRegular
                        style={{ marginBottom: 6 }}
                        size={14}
                        color="black"
                    >
                        {label}
                    </TextRegular>
                )}
            </View>
            <TouchableOpacity
                style={{
                    ...classes.inputStyle,
                    ...classes.smallDatePickerTouchable,
                    borderWidth: borderState ? 1 : 0,
                    borderColor: borderState,
                }}
                {...rest}
            >
                <TextRegular
                    color={value.length ? 'black' : 'rgba(0, 0, 0, 0.3)'}
                >
                    {value.length
                        ? formatDate(value, placeholder)
                        : placeholder}
                </TextRegular>
            </TouchableOpacity>
        </View>
    );
}

export default InputDatePickerSelector;
