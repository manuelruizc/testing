import React, { forwardRef } from 'react';
import { View, TextInput } from 'react-native';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import KwivrrIcon from '../KwivrrIcon/';

function Searchbar(props, ref) {
    const {
        style = {},
        onSubmitEditing = () => {},
        onChangeText = (text) => {},
        value,
        ...rest
    } = props;
    const classes = useStyles(styles);
    return (
        <View style={[classes.container, style]}>
            <KwivrrIcon
                name="search"
                color="#C9C9C9"
                size={24}
                style={classes.searchIcon}
            />
            <TextInput
                autoFocus
                ref={ref}
                style={classes.textInput}
                placeholder="Search by user or event title"
                keyboardAppearance="default"
                enablesReturnKeyAutomatically
                returnKeyLabel="Search"
                returnKeyType="search"
                {...rest}
                value={value}
                onChangeText={(text) => onChangeText(text)}
                onSubmitEditing={onSubmitEditing}
            />
        </View>
    );
}

export default forwardRef(Searchbar);
