import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import useTheme from 'kwivrr-hooks/useTheme';
import TextRegular from '../../TextRegular';

const bankingOptions = [
    { label: 'Credit Card', value: 'card' },
    { label: 'Bank Account', value: 'account' },
];

function Options({ select, option }) {
    const classes = useStyles(styles);
    const { palette } = useTheme();
    return (
        <View style={classes.body}>
            {bankingOptions.map(({ value, label }, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => select(value)}
                    style={{
                        ...classes.optionButton,
                        marginRight: index === 0 ? 24 : 0,
                        backgroundColor:
                            value === option
                                ? palette.button.primary
                                : 'transparent',
                    }}
                >
                    <TextRegular
                        color={
                            value === option
                                ? palette.common.white
                                : palette.button.primary
                        }
                    >
                        {label}
                    </TextRegular>
                </TouchableOpacity>
            ))}
        </View>
    );
}

export default Options;
