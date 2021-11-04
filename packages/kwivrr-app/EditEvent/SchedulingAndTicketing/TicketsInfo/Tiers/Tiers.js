import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import Touchable from 'kwivrr-ui/Touchable';
import TextRegular from 'kwivrr-ui/TextRegular';
import AuthButton from 'kwivrr-ui/AuthButton';
import useTheme from 'kwivrr-hooks/useTheme';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import Tier from './Tier/Tier';

const actions = {
    DELETE: 1,
    ADD: 2,
};

const TIER_CONTAINER_HEIGHT = 100 + 14;
const MAX_TIER_CONTAINER_HEIGHT = TIER_CONTAINER_HEIGHT * 3 + 48;

function Tiers({ setFieldValue, tiers: formikTiers, closeModal }) {
    const { palette } = useTheme();
    const scrollView = useRef(null);
    const scrollViewHeight = useSharedValue(0);
    const [actionExecuted, setActionExecuted] = useState(-1);
    const [tiers, setTiers] = useState(formikTiers);
    const addNewTier = () => {
        setTiers((prevTiers) => [
            ...prevTiers,
            {
                scheduledStartTime: '',
                price: '',
                priceVIP: '',
            },
        ]);
        setActionExecuted(actions.ADD);
    };

    const style = useAnimatedStyle(() => {
        return {
            width: '100%',
            height: scrollViewHeight.value,
            maxHeight: MAX_TIER_CONTAINER_HEIGHT,
        };
    });

    useEffect(() => {
        scrollViewHeight.value = withTiming(
            tiers.length * TIER_CONTAINER_HEIGHT + 48 >
                MAX_TIER_CONTAINER_HEIGHT
                ? MAX_TIER_CONTAINER_HEIGHT
                : tiers.length * TIER_CONTAINER_HEIGHT + 48
        );
    }, [tiers]);

    useEffect(() => {
        if (tiers.length >= 4) {
            setTimeout(() => {
                scrollView.current?.scrollToEnd({ animated: true });
            }, 500);
        }
        if (tiers.length === 3) {
            scrollView.current?.scrollTo({ animated: true, x: 0, y: 0 });
        }
    }, [tiers]);

    const addTiers = () => {
        if (buttonDisabled) return;
        setFieldValue('tiers', [...tiers]);
        closeModal();
    };

    const buttonDisabled = useMemo(() => {
        if (!tiers.length) return true;
        let i = 0,
            j = tiers.length - 1;
        while (i <= j) {
            if (
                !tiers[i].scheduledStartTime.length ||
                !tiers[j].scheduledStartTime.length ||
                !tiers[i].priceVIP.length ||
                !tiers[j].priceVIP.length ||
                !tiers[i].price.length ||
                !tiers[j].price.length
            ) {
                return true;
            }
            i++;
            j--;
        }
        return false;
    }, [tiers]);

    return (
        <View style={{ alignItems: 'center' }}>
            <Animated.View style={style}>
                <ScrollView
                    ref={scrollView}
                    onContentSizeChange={() => {
                        if (actionExecuted === actions.ADD) {
                            scrollView.current?.scrollToEnd({ animated: true });
                        }
                    }}
                >
                    {tiers.map((tier, index) => (
                        <Tier
                            setActionExecuted={setActionExecuted}
                            setTiers={setTiers}
                            tier={tier}
                            index={index}
                            key={index}
                        />
                    ))}
                </ScrollView>
                <Touchable onPress={addNewTier}>
                    <View style={{ paddingVertical: 12, paddingLeft: 32 }}>
                        <TextRegular color={palette.button.primary}>
                            + Add Additional Tier
                        </TextRegular>
                    </View>
                </Touchable>
            </Animated.View>
            <AuthButton
                disabled={buttonDisabled}
                onPress={addTiers}
                textFontSize={18}
                buttonStyle={{ width: 'auto', paddingHorizontal: 32 }}
                style={{ width: 'auto', marginVertical: 32 }}
                uppercase={false}
                textColor="white"
                backgroundColor={palette.button.primary}
            >
                Save Schedule
            </AuthButton>
            <Touchable onPress={closeModal}>
                <TextRegular style={{ marginBottom: 32 }}>Cancel</TextRegular>
            </Touchable>
        </View>
    );
}

export default memo(Tiers);
