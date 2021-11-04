import React from 'react';
import { ActivityIndicator, TouchableOpacity, View } from 'react-native';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextGradient from '../TextGradient';
import GradientBackgroundRectangular from '../GradientBackgroundRectangular';
import KwivrrGradient from '../KwivrrGradient/KwivrrGradient';
import useTheme from 'kwivrr-hooks/useTheme';

function AuthButton({
    isLoading,
    children,
    style = {},
    buttonStyle = {},
    gradientBackground = false,
    backgroundColor = 'white',
    textColor = 'black',
    uppercase = true,
    textFontSize = 32,
    activeOpacity = 0.8,
    textGradient = false,
    activityIndicatorColor = null,
    ...rest
}) {
    const { palette } = useTheme();
    return (
        <View
            style={{
                alignItems: 'center',
                width: '100%',
                ...style,
                borderRadius: 1000,
                overflow: 'hidden',
                opacity: rest.disabled ? 0.6 : 1,
            }}
        >
            {gradientBackground && (
                <KwivrrGradient
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                />
            )}
            <TouchableOpacity
                disabled={isLoading}
                activeOpacity={activeOpacity}
                style={{
                    width: '100%',
                    paddingVertical: 10,
                    borderRadius: 1000,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: gradientBackground
                        ? 'transparent'
                        : backgroundColor,
                    ...buttonStyle,
                }}
                {...rest}
            >
                {isLoading ? (
                    <ActivityIndicator
                        color={
                            activityIndicatorColor
                                ? activityIndicatorColor
                                : palette.loading.indicator
                        }
                        size="small"
                        style={{ paddingVertical: 1 }}
                    />
                ) : uppercase ? (
                    textGradient ? (
                        <TextGradient fontSize={textFontSize}>
                            {children}
                        </TextGradient>
                    ) : (
                        <TextHeader
                            color={textColor}
                            style={{ textTransform: 'uppercase' }}
                            size={textFontSize}
                        >
                            {children}
                        </TextHeader>
                    )
                ) : (
                    <TextHeader color={textColor} size={textFontSize}>
                        {children}
                    </TextHeader>
                )}
            </TouchableOpacity>
        </View>
    );
}

export default AuthButton;
