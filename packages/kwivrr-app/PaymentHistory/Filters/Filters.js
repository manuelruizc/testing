import React from 'react';
import { View } from 'react-native';
import InputComponent from 'kwivrr-ui/InputComponent';
import Select from 'kwivrr-ui/Select/Select';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';

function Filters({ filter, setFilter, searchTerm, setSearchTerm, options }) {
    const classes = useStyles(styles);
    return (
        <View style={classes.options}>
            <InputComponent
                iconLeft="search"
                inputStyle={{
                    ...classes.inputStyle,
                }}
                returnKeyType="search"
                style={{ width: '48%' }}
                placeholder={'Search'}
                value={searchTerm}
                onChangeText={(text) => setSearchTerm(text)}
            />
            <Select
                listMode="SCROLLVIEW"
                scrollViewProps={{
                    nestedScrollEnabled: true,
                }}
                value={filter}
                style={{
                    ...classes.inputStyle,
                    width: '100%',
                    borderWidth: 0,
                    zIndex: 12,
                }}
                inputStyle={{ width: '48%' }}
                options={options}
                dropDownDirection="BOTTOM"
                mode="SIMPLE"
                placeholder="All"
                placeholderStyle={{
                    color: 'rgba(0, 0, 0, 0.2)',
                    fontSize: 15,
                    fontFamily: 'Rubik-Light',
                }}
                onChange={(value) => setFilter(value)}
            />
        </View>
    );
}

export default Filters;
