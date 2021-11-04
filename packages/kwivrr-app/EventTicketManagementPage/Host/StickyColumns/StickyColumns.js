import React from 'react';
import { View, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from '../styles';
import RadioButton from 'kwivrr-ui/RadioButton';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';

function StickyColumns({
    data,
    selectedData,
    onSelect
}) {
    const classes = useStyles(styles);
    return (
        <View style={classes.stickyColumns}>
            <TouchableOpacity
                style={classes.stickyTableHeader}
                onPress={() => onSelect(null, null, true)}
                >
                <RadioButton
                    onPress={() => onSelect(null, null, true)}
                    selected={(selectedData.length === data.length) && data.length > 0}
                    size={20}
                    buttonStyle={classes.radioButton}
                    selectedItem={<KwivrrIcon name="check" color="white" size={12} />}
                />
            </TouchableOpacity>
            {data.map((option, idx) => {
                return (
                    <TouchableOpacity
                        key={idx}
                        style={classes.stickyTableData}
                        onPress={() => onSelect(option, idx)}
                    >
                        <RadioButton
                            onPress={() => onSelect(option, idx)}
                            selected={selectedData.find(selected => selected.id === option.id)}
                            size={20}
                            buttonStyle={classes.radioButton}
                            selectedItem={<KwivrrIcon name="check" color="white" size={12} />}
                        />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

StickyColumns.propTypes = {
    data: PropTypes.array.isRequired,
    selectedData: PropTypes.any, // double check this
    onSelect: PropTypes.func.isRequired
}

export default StickyColumns;
