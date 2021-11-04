import React from 'react';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextHeader from 'kwivrr-ui/TextHeader';
import TextRegular from 'kwivrr-ui/TextRegular';
import Touchable from 'kwivrr-ui/Touchable';
import AuthButton from 'kwivrr-ui/AuthButton';
import useTheme from 'kwivrr-hooks/useTheme';

function Modal({ closeModal, confirmFunction, labels, params }) {
    const classes = useStyles(styles);
    const { palette } = useTheme();
    const [header, cancel, accept] = labels;
    const confirm = () => {
        confirmFunction(...params);
        closeModal();
    };
    return (
        <View
            style={{
                width: '100%',
                paddingVertical: 48,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <TextHeader
                size={18}
                style={{ marginBottom: 48, textAlign: 'center', width: '94%' }}
            >
                {header}
            </TextHeader>
            <View
                style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 32,
                }}
            >
                <Touchable onPress={() => closeModal()}>
                    <View style={{ paddingHorizontal: 32 }}>
                        <TextRegular size={16}>{cancel}</TextRegular>
                    </View>
                </Touchable>
                <AuthButton
                    onPress={confirm}
                    backgroundColor={palette.button.primary}
                    style={{ width: 'auto' }}
                    buttonStyle={{ width: 'auto', paddingHorizontal: 32 }}
                    textColor="white"
                    textFontSize={16}
                    uppercase={false}
                >
                    {accept}
                </AuthButton>
            </View>
        </View>
    );
}

export default Modal;
