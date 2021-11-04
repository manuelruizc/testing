import React, { useEffect, useMemo, useState } from 'react';
import { View, Switch, TouchableOpacity } from 'react-native';
import RadioButton from 'kwivrr-ui/RadioButton';
import InputComponent from 'kwivrr-ui/InputComponent';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Divider from 'kwivrr-ui/Divider';
import TextRegular from 'kwivrr-ui/TextRegular/TextRegular';
import KwivrrSwitch from 'kwivrr-ui/KwivrrSwitch';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import TextHeader from '../../../TextHeader';

function SelectCards({
    applyCredits,
    setApplyCredits,
    credits,
    cards,
    setSelectedCardId,
}) {
    const classes = useStyles(styles);
    const [cardOption, setCardOption] = useState(-1);

    useEffect(() => {
        cards.forEach((card, index) => {
            if (card.isDefault) {
                setCardOption(index);
                setSelectedCardId(card.id);
            }
        });
        if (cards.length === 0) {
            setSelectedCardId(-1);
        }
    }, []);

    const selectCard = (id, index) => {
        setSelectedCardId(id);
        setCardOption(index);
    };

    return (
        <>
            <View style={classes.container}>
                {/* <View style={classes.creditsToggle}>
                    <KwivrrSwitch
                        value={applyCredits}
                        onChange={() => setApplyCredits((prev) => !prev)}
                    />
                    <View style={classes.creditLabel}>
                        <TextRegular>Apply {credits}</TextRegular>
                        <KwivrrImage
                            style={classes.kwivrrCreditsLogo}
                            resizeMode="contain"
                            source={require('kwivrr-assets/logo/Icon/PNG/Kwivrr_Icon_4C.png')}
                        />
                        <TextRegular>credits</TextRegular>
                    </View>
                </View> */}
                {cards.map((card, idx) => (
                    <RadioButton
                        style={classes.ccRadioButton}
                        labelStyle={classes.ccLabelStyle}
                        size={22}
                        label={`Card Ending in ${card.lastFour}`}
                        key={idx}
                        selected={cardOption === idx}
                        onPress={() => selectCard(card.id, idx)}
                    />
                ))}
                <RadioButton
                    size={22}
                    label="New Credit Card"
                    labelStyle={{ marginLeft: 12 }}
                    selected={cardOption === -1}
                    onPress={() => selectCard(-1, -1)}
                />
            </View>
        </>
    );
}

export default SelectCards;
