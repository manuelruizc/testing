import React, {
    forwardRef,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import { debounce } from 'lodash';
import InputComponent from '../InputComponent';
import TextRegular from '../TextRegular';
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextHeader from '../TextHeader';
import useTheme from 'kwivrr-hooks/useTheme';
import usePlatform from 'kwivrr-hooks/usePlatftorm';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function AutoCompleteInput(props, ref) {
    const {
        style = {},
        onChangeText = () => {},
        onSearch = () => {},
        onAutocompleteChange = () => {},
        data = [],
        onPressItem = () => {},
        closeOnPress = false,
        ...rest
    } = props;
    const { isAndroid } = usePlatform();
    const [searchTerm, setSearchTerm] = useState('');
    const [autocompleteActive, setAutocompleteActive] = useState(false);
    const [isSearching, setIsSearching] = useState([]);
    const isSearchingUI = useSharedValue(false);
    const searchFunction = (text) => {
        if (text === '') return;
        onSearch(text);
    };
    const debounceSearch = useCallback(debounce(searchFunction, 700), []);
    const _onChangeText = (text) => {
        if (!isSearching) {
            setIsSearching(true);
            isSearchingUI.value = true;
        }
        setSearchTerm(text);
        onChangeText(text);
        debounceSearch(text);
    };
    useEffect(() => {
        onAutocompleteChange({ isOpen: autocompleteActive });
    }, [autocompleteActive, onAutocompleteChange]);
    useEffect(() => {
        setIsSearching(false);
        isSearchingUI.value = false;
    }, [data, setIsSearching]);
    const searchContainerHeight = useMemo(() => {
        const max = 50 * 4;
        if (data.length === 0) return 50;
        return data.length * 50 > max ? max : data.length * 50;
    }, [data]);

    const containerStyle = useAnimatedStyle(() => {
        if (isAndroid) {
            return {
                width: '100%',
                height: withTiming(
                    isSearchingUI.value ? 40 : searchContainerHeight
                ),
                position: 'absolute',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'white',
                top: withTiming(
                    isSearchingUI.value ? -40 : -searchContainerHeight
                ),
                left: 0,
                zIndex: 100000,
                borderRadius: 8,
                elevation: 5,
                borderWidth: 1,
                overflow: 'hidden',
                transform: [
                    {
                        translateY: 12,
                    },
                ],
            };
        }

        return {
            width: '100%',
            height: withTiming(
                isSearchingUI.value ? 40 : searchContainerHeight
            ),
            position: 'absolute',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            top: withTiming(isSearchingUI.value ? -40 : -searchContainerHeight),
            left: 0,
            zIndex: 100000,
            borderRadius: 8,
            shadowOffset: {
                width: 0,
                height: 0,
            },
            shadowOpacity: 1,
            shadowRadius: 20,
            shadowColor: 'black',
            borderWidth: 1,
            overflow: 'hidden',
            transform: [
                {
                    translateY: 12,
                },
            ],
        };
    });

    return (
        <View style={{ ...style, position: 'relative' }}>
            <InputComponent
                {...rest}
                onChangeText={_onChangeText}
                // onBlur={() => setAutocompleteActive(false)}
                onFocus={() => setAutocompleteActive(true)}
                iconRight={data.length > 0 ? 'x' : undefined}
                iconRightOnPress={() => setAutocompleteActive(false)}
                {...{ ref }}
            />
            {autocompleteActive && searchTerm.length > 0 && (
                <Animated.View style={containerStyle}>
                    {isSearching && <ActivityIndicator color="#EA5D3E" />}
                    {data &&
                        !isSearching &&
                        (data.length > 0 ? (
                            <View
                                style={{
                                    flex: 1,
                                    width: '100%',
                                }}
                            >
                                <ScrollView
                                    // style={{ flex: 1 }}
                                    // contentContainerStyle={{ flex: 1 }}
                                    scrollEventThrottle={16}
                                    onLayout={(evt) => {
                                        const { height } =
                                            evt.nativeEvent.layout;
                                        console.log('height', {
                                            height,
                                            length: data.length,
                                        });
                                    }}
                                    nestedScrollEnabled={true}
                                >
                                    {data.map((item, idx) => (
                                        <TouchableWithoutFeedback key={idx}>
                                            <AutocompleteItem
                                                onPressItem={onPressItem}
                                                item={item}
                                                index={idx}
                                                key={idx}
                                                closeOnPress={closeOnPress}
                                                close={() =>
                                                    setAutocompleteActive(false)
                                                }
                                            />
                                        </TouchableWithoutFeedback>
                                    ))}
                                </ScrollView>
                            </View>
                        ) : (
                            // </View>
                            <TextRegular>Couldn't find a user</TextRegular>
                        ))}
                </Animated.View>
            )}
        </View>
    );
}

function AutocompleteItem({ item, onPressItem, index, close, closeOnPress }) {
    const { id, firstName, lastName, avatarUrl, isKwivrrUser, tagline } = item;
    const onPress = () => {
        onPressItem(item, index);
        if (closeOnPress) {
            close();
        }
    };
    const { palette } = useTheme();
    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                width: '100%',
                height: 50,
                flexDirection: 'row',
                justifyContent: 'flex-start',
                alignItems: 'center',
                paddingHorizontal: 8,
            }}
        >
            <View
                style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40,
                    marginRight: 8,
                    shadowOffset: {
                        width: 0,
                        height: 0,
                    },
                    shadowOpacity: 0.4,
                    shadowRadius: 10,
                    shadowColor: 'black',
                    backgroundColor: palette.placeholder,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <TextRegular>
                        {firstName[0] ? firstName[0] : ''}
                    </TextRegular>
                </View>
                <Image
                    source={{ uri: imageSourceWithoutCache(avatarUrl) }}
                    style={{
                        width: 40,
                        height: 40,
                        borderRadius: 40,
                        marginRight: 8,
                        shadowOffset: {
                            width: 0,
                            height: 0,
                        },
                        shadowOpacity: 0.4,
                        shadowRadius: 10,
                        shadowColor: 'black',
                    }}
                    resizeMode="cover"
                />
            </View>
            <View>
                <TextHeader>{`${firstName} ${lastName}`}</TextHeader>
                {/* <TextRegular>{tagline}</TextRegular> */}
            </View>
        </TouchableOpacity>
    );
}

export default forwardRef(AutoCompleteInput);
