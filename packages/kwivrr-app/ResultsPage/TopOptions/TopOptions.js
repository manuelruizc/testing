import React from 'react';
import { View } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Touchable from 'kwivrr-ui/Touchable';
import TextRegular from 'kwivrr-ui/TextRegular';
import useTheme from 'kwivrr-hooks/useTheme';

const options = ['General', 'Attendee History', 'User Management'];

function TopOptions({ selectedIndex, setSelectedIndex }) {
    const classes = useStyles(styles);
    const { palette } = useTheme();
    return (
        <View style={classes.topOptions}>
            {options.map((option, index) => (
                <Touchable key={index} onPress={() => setSelectedIndex(index)}>
                    <View
                        style={[
                            classes.option,
                            {
                                backgroundColor:
                                    selectedIndex === index
                                        ? palette.button.primary
                                        : palette.common.white,
                            },
                        ]}
                    >
                        <TextRegular
                            color={
                                selectedIndex === index
                                    ? palette.common.white
                                    : palette.button.primary
                            }
                            style={classes.optionText}
                        >
                            {option}
                        </TextRegular>
                    </View>
                </Touchable>
            ))}
        </View>
    );
}

export default TopOptions;
