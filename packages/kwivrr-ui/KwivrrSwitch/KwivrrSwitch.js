import React from 'react';
import { Switch, View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from '../TextRegular';

// refactor this
// use colors from theme here
function KwivrrSwitch({ label, style = {}, labelStyle = {}, ...rest }) {
    const classes = useStyles(styles);
    // alert(JSON.stringify(labelStyle));
    if (label) {
        return (
            <View style={[classes.switchContainer, style]}>
                <TextRegular
                    size={16}
                    style={{ ...classes.switchTitle, ...labelStyle }}
                >
                    {label}
                </TextRegular>
                <Switch
                    thumbColor={Platform.OS === 'android' && 'white'}
                    trackColor={{ true: '#3551A1', false: '#666666' }}
                    {...rest}
                />
            </View>
        );
    }
    return (
        <Switch
            thumbColor={Platform.OS === 'android' && 'white'}
            trackColor={{ true: '#3551A1', false: '#666666' }}
            {...rest}
        />
    );
}

export default KwivrrSwitch;
