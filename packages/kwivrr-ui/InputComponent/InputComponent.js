import React, { useState, forwardRef, useMemo } from 'react';
import { TextInput, View } from 'react-native';
import TextRegular from 'kwivrr-ui/TextRegular/';
import KwivrrIcon from '../KwivrrIcon';
import Touchable from '../Touchable';
import { useField } from 'formik';

function InputComponent(
    {
        label = false,
        onChange = () => {},
        style = {},
        inputStyle = {},
        labelColor: color = 'black',
        labelSize: size = 14,
        labelStyle = {},
        iconLeft = null,
        iconLeftSize = 14,
        iconRightSize = 14,
        iconRight = null,
        iconRightOnPress = null,
        iconLeftOnPress = null,
        borderState = null,
        inputInnerStyle = {},
        error,
        touched,
        errorColor = 'tomato',
        multiline = false,
        usingFormikField = false,
        name,
        ...rest
    },
    ref
) {
    const textInputIconStyle = useMemo(() => {
        if (iconRight && iconLeft)
            return {
                paddingLeft: iconLeftSize * 2,
                paddingRight: iconRightSize * 2,
            };
        if (iconRight) return { paddingRight: iconRightSize * 2 };
        if (iconLeft) return { paddingLeft: iconLeftSize * 2 };
        return { paddingTop: multiline ? 10 : 0 };
    }, [iconRight, iconLeft, multiline]);

    return (
        <View style={style}>
            {/* {label && <TextRegular style={{marginBottom: 6, ...labelStyle}} size={size} color={color}>{label}</TextRegular>} */}
            {label && (
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        justifyContent: label ? 'space-between' : 'flex-end',
                        alignItems: 'center',
                    }}
                >
                    {label && (
                        <TextRegular
                            style={{ marginBottom: 6, ...labelStyle }}
                            size={size}
                            color={color}
                        >
                            {label}
                        </TextRegular>
                    )}
                    {touched && error && (
                        <TextRegular color={errorColor}>{error}</TextRegular>
                    )}
                </View>
            )}
            <View style={{ ...inputInnerStyle, flexDirection: 'row' }}>
                {iconLeft && (
                    <Touchable
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            height: label ? inputStyle.height : '100%',
                            paddingHorizontal: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={iconLeftOnPress}
                    >
                        <KwivrrIcon
                            size={iconLeftSize}
                            name={iconLeft}
                            color="rgba(0, 0, 0, 0.3)"
                        />
                    </Touchable>
                )}
                {usingFormikField ? (
                    <FormikInput
                        ref={ref}
                        multiline={multiline}
                        inputStyle={inputStyle}
                        textInputIconStyle={textInputIconStyle}
                        borderState={borderState}
                        name={name}
                        // rest={rest}
                        {...rest}
                    />
                ) : (
                    <CurrentInput
                        ref={ref}
                        multiline={multiline}
                        inputStyle={inputStyle}
                        textInputIconStyle={textInputIconStyle}
                        borderState={borderState}
                        onChange={onChange}
                        // rest={rest}
                        {...rest}
                    />
                )}
                {iconRight && (
                    <Touchable
                        style={{
                            position: 'absolute',
                            top: 0,
                            right: 0,
                            paddingHorizontal: 12,
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: label ? inputStyle.height : '100%',
                        }}
                        onPress={iconRightOnPress}
                    >
                        <KwivrrIcon
                            size={iconRightSize}
                            name={iconRight}
                            color="rgba(0, 0, 0, 0.3)"
                        />
                    </Touchable>
                )}
            </View>
        </View>
    );
}

const FormikInput = forwardRef((props, ref) => {
    const {
        multiline,
        inputStyle,
        textInputIconStyle,
        borderState,
        name,
        ...rest
    } = props;
    const [field, meta, helpers] = useField(name);
    const { setValue } = helpers;
    return (
        <TextInput
            textAlignVertical={multiline ? 'top' : 'auto'}
            multiline={multiline}
            style={[
                inputStyle,
                textInputIconStyle,
                borderState && {
                    borderWidth: 1,
                    borderColor: borderState,
                },
            ]}
            value={field.value}
            onChangeText={(text) => setValue(text)}
            {...{ ref }}
            {...rest}
        />
    );
});

const CurrentInput = forwardRef((props, ref) => {
    const {
        multiline,
        inputStyle,
        textInputIconStyle,
        borderState,
        onChange,
        ...rest
    } = props;
    return (
        <TextInput
            textAlignVertical={multiline ? 'top' : 'auto'}
            multiline={multiline}
            style={[
                inputStyle,
                textInputIconStyle,
                borderState && {
                    borderWidth: 1,
                    borderColor: borderState,
                },
            ]}
            // value={value}
            onChangeText={(text) => {
                onChange(text);
            }}
            {...{ ref }}
            {...rest}
        />
    );
});

export default forwardRef(InputComponent);
