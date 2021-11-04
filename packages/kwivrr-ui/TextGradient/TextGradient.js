import React from 'react';
import MaskedView from '@react-native-community/masked-view';
import TextHeader from '../TextHeader';
import KwivrrGradient from '../KwivrrGradient';
import { View, Text } from 'react-native';

function TextGradient(props) {
    const {
        style = {},
        fontSize = 14,
        ...rest
    } = props;
    return (
        <View style={{width: '100%', height: fontSize*1.2}}>
            <MaskedView
                style={{ flex: 1, flexDirection: 'row' }}
                maskElement={
                <View
                    style={{
                        backgroundColor: 'transparent',
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextHeader color="black" size={fontSize}>{props.children}</TextHeader>
                </View>
                }
            >
                <KwivrrGradient style={{width: '100%', height: '100%'}} />
            </MaskedView>
        </View>
    );
}

export default TextGradient;
