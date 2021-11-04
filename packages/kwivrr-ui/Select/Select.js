import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import TextRegular from '../TextRegular';

function Select({
    value,
    onChange = () => {},
    style,
    inputStyle = {},
    label,
    options,
    multiple = false,
    ...rest
}) {
    const [open, setOpen] = useState(false);
    const [_value, setValue] = useState(multiple ? [] : null);
    const [items, setItems] = useState(options);
    useEffect(() => {
        if (!_value) return;
        onChange(_value);
    }, [_value]);

    useEffect(() => {
        setItems([...options]);
    }, [options]);
    return (
        <View style={inputStyle}>
            {label && (
                <TextRegular style={{ marginBottom: 6 }}>{label}</TextRegular>
            )}
            <DropDownPicker
                open={open}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                multiple={multiple}
                {...rest}
                style={style}
                value={value}
            />
        </View>
    );
}

export default Select;
