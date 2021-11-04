import React, { forwardRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import InputComponent from 'kwivrr-ui/InputComponent';
import KwivrrSwitch from 'kwivrr-ui/KwivrrSwitch';
import TextRegular from 'kwivrr-ui/TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import parentStyles from '../styles';
import { formatDate } from 'kwivrr-common/dateFormats';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';

export function DoubleTextInputContainer({ children }) {
    const classes = useStyles(styles);
    return <View style={classes.doubleTextInputContainer}>{children}</View>;
}

export const SmallDatePicker = ({
    id,
    formValues,
    label,
    placeholder = '',
    dateFormatted = true,
    style,
    onPressEmpty,
    ...rest
}) => {
    const parentClasses = useStyles(parentStyles);
    const classes = useStyles(styles, { label });
    const valueExists = !formValues[id]
        ? false
        : formValues[id].length
        ? true
        : false;

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
            <View
                style={{
                    ...parentClasses.inputStyle,
                    ...classes.smallDatePickerTouchable,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <TouchableOpacity
                    style={{
                        width: valueExists ? '80%' : '100%',
                        height: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                    {...rest}
                >
                    <TextRegular
                        color={
                            !formValues[id]
                                ? 'black'
                                : formValues[id].length
                                ? 'black'
                                : 'rgba(0, 0, 0, 0.3)'
                        }
                    >
                        {!formValues[id]
                            ? placeholder
                            : formValues[id].length
                            ? formatDate(formValues[id], placeholder)
                            : placeholder}
                    </TextRegular>
                </TouchableOpacity>
                {valueExists && (
                    <TouchableOpacity
                        style={{
                            width: '20%',
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={onPressEmpty}
                    >
                        <KwivrrIcon
                            name="x"
                            color="rgba(0, 0, 0, 0.6)"
                            size={18}
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export const SmallTextInput = forwardRef((props, ref) => {
    const { width = 46, inputStyle = {}, ...rest } = props;
    const _width = `${width}%`;
    const parentClasses = useStyles(parentStyles);
    return (
        <InputComponent
            inputStyle={{ ...parentClasses.inputStyle, ...inputStyle }}
            ref={ref}
            style={{ width: _width }}
            labelSize={14}
            labelColor="black"
            {...rest}
        />
    );
});

export const FullWidthTextInput = forwardRef((props, ref) => {
    const { description, ...rest } = props;
    const classes = useStyles(parentStyles);
    return (
        <InputComponent
            ref={ref}
            style={{ width: '100%' }}
            inputStyle={
                description
                    ? { ...classes.inputStyleDescription }
                    : { ...classes.inputStyle }
            }
            labelSize={14}
            labelColor="black"
            {...rest}
        />
    );
});

export const SharedSwitch = forwardRef((props, ref) => {
    const { label = '', ...rest } = props;
    const classes = useStyles(styles);
    return (
        <View style={classes.sharedSwitch}>
            <TextRegular size={16} style={classes.sharedSwitchLabel}>
                {label}
            </TextRegular>
            <KwivrrSwitch {...rest} />
        </View>
    );
});
