import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import InputComponent from 'kwivrr-ui/InputComponent';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import TextHeader from 'kwivrr-ui/TextHeader';
import Touchable from 'kwivrr-ui/Touchable';
import useStyles from 'kwivrr-hooks/useStyles';
import parentStyles from '../styles';
import styles from './styles';
import useTheme from 'kwivrr-hooks/useTheme';

const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

function Option({ changeOptionText, deleteAnswerOption, index, option }) {
    const classes = useStyles(styles);
    const parentClasses = useStyles(parentStyles);
    const { palette } = useTheme();
    return (
        <View style={parentClasses.optionContainer}>
            <View style={parentClasses.optionLabel}>
                <TextHeader>{alphabet[index].toUpperCase()}.</TextHeader>
            </View>
            <InputComponent
                value={option}
                onChangeText={(text) => changeOptionText(text, index)}
                borderState={
                    option.length > 0 ? palette.button.primary : 'tomato'
                }
                inputStyle={parentClasses.inputStyle}
                style={{ ...classes.questionInputComponent }}
                placeholder={`Answer ${index + 1}`}
            />
            {index > 1 && (
                <TouchableOpacity
                    style={classes.touchable}
                    onPress={() => {
                        deleteAnswerOption(index);
                    }}
                >
                    <View style={classes.deleteButton}>
                        <KwivrrIcon name="x" color="white" size={18} />
                    </View>
                </TouchableOpacity>
            )}
        </View>
    );
}

export default memo(Option);
