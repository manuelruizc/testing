import React from 'react';
import { View } from 'react-native';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrSwitch from 'kwivrr-ui/KwivrrSwitch';
import InputComponent from 'kwivrr-ui/InputComponent';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from '../styles';

function CancelOption({ value, title, onChange, onChangeText, withOptions }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.containerRefundOptions}>
            <View style={classes.switchContainer}>
                <TextRegular size={16} style={{ marginRight: 12 }}>
                    {title}
                </TextRegular>
                <KwivrrSwitch onChange={onChange} value={value} />
            </View>
            {withOptions && value && (
                <View style={classes.inputContainer}>
                    <TextRegular size={16} style={classes.inputContainerLabel}>
                        Amount
                    </TextRegular>
                    <InputComponent
                        keyboardType="decimal-pad"
                        onChangeText={onChangeText}
                        placeholder="$ 0"
                        style={classes.inputComponentOptions}
                        inputStyle={classes.inputStyle}
                        editable={false}
                    />
                </View>
            )}
        </View>
    );
}

export default CancelOption;
