import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrIcon from '../KwivrrIcon';
import TextRegular from '../TextRegular';

function SettingsLayout({ children, onPress }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.container}>
            <View style={classes.header}>
                <TouchableOpacity
                    onPress={onPress}
                    style={classes.buttonContainer}
                >
                    <KwivrrIcon name="arrow-left" size={26} style={{marginRight: 2}} />
                    <TextRegular size={20}>Back</TextRegular>
                </TouchableOpacity>
            </View>
            <View style={classes.content}>
                {children}
            </View>
        </View>
    );
}

export default SettingsLayout;
