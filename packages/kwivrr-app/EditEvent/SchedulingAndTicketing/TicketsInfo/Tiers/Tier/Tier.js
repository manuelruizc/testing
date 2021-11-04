import React, { useState } from 'react';
import { View } from 'react-native';
import TextHeader from 'kwivrr-ui/TextHeader';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import { SmallTextInput } from '../../../../shared';
import InputDatePickerSelector from 'kwivrr-ui/InputDatePickerSelector/InputDatePickerSelector';
import DatePicker from 'kwivrr-ui/DatePicker';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import Touchable from 'kwivrr-ui/Touchable';

function Tier({ tier, setTiers, index, setActionExecuted }) {
    const classes = useStyles(styles);
    const [isVisible, setIsVisible] = useState(false);
    const showDatePicker = () => {
        setIsVisible(true);
    };
    const handleConfirm = (date) => {
        const dateString = date.toString();
        updateTier(index, 'scheduledStartTime', dateString);
        setIsVisible(false);
    };

    const updateTier = (idx, key, newValue) => {
        setTiers((prevTiers) => {
            prevTiers[idx][key] = newValue;
            return [...prevTiers];
        });
    };

    const deleteTier = (index) => {
        setTiers((prevTiers) => {
            prevTiers.splice(index, 1);
            return [...prevTiers];
        });
        setActionExecuted(1);
    };

    return (
        <React.Fragment>
            <View style={classes.container}>
                <View style={classes.tierTitle}>
                    <TextHeader size={16}>Tier {index + 1}</TextHeader>
                    <Touchable
                        style={{ position: 'absolute', right: 24, top: 0 }}
                        onPress={() => deleteTier(index)}
                    >
                        <View
                            style={{
                                padding: 4,
                                borderRadius: 1000,
                                backgroundColor: 'tomato',
                            }}
                        >
                            <KwivrrIcon name="x" size={14} color="white" />
                        </View>
                    </Touchable>
                </View>
                <View style={classes.inputsContainer}>
                    <InputDatePickerSelector
                        value={tier.scheduledStartTime}
                        label="Schedule Release"
                        style={classes.inputDatePicker}
                        onPress={showDatePicker}
                        dateFormatted={false}
                        placeholder="00:00"
                    />
                    <SmallTextInput
                        keyboardType="decimal-pad"
                        onChangeText={(text) =>
                            updateTier(index, 'price', text)
                        }
                        value={tier.price}
                        label="Price"
                        labelSize={14}
                        width={20}
                        placeholder="0"
                        inputStyle={classes.inputStyle}
                    />
                    <SmallTextInput
                        keyboardType="decimal-pad"
                        onChangeText={(text) =>
                            updateTier(index, 'priceVIP', text)
                        }
                        value={tier.priceVIP}
                        label="VIP price"
                        labelSize={14}
                        width={20}
                        placeholder="0"
                        inputStyle={classes.inputStyle}
                    />
                </View>
            </View>
            <DatePicker
                isVisible={isVisible}
                onConfirm={handleConfirm}
                mode="time"
                onCancel={() => setIsVisible(false)}
            />
        </React.Fragment>
    );
}

export default Tier;
3;
