import React, { useEffect } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import useDimensions from 'kwivrr-hooks/useDimensions';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import TextRegular from 'kwivrr-ui/TextRegular';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import * as WebBrowser from 'expo-web-browser';
import * as Linking from 'expo-linking';
import useToast from 'kwivrr-hooks/useToast';

const PROVIDERS = [
    {
        name: 'youtube',
        logo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8lgoh6ZsnUTKgmZUO7FNMn1h5-ZVvqKjHeg&usqp=CAU',
    },
    {
        name: 'vimeo',
        logo: 'https://www.mecanizadossinc.com/wp-content/uploads/2015/05/vimeo-logo.png',
    },
    {
        name: 'Zoom',
        logo: 'https://cdn.freelogovectors.net/wp-content/uploads/2020/10/zoom-icon-logo.png',
    },
    {
        name: 'resi',
        logo: 'https://resi.io/wp-content/uploads/2020/08/Resi-Logo-05.png',
    },
    {
        name: 'kwivrr',
        logo: 'data:image/png;base64,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',
    },
];

const redirect = encodeURIComponent(
    'https://zevents.dev.vibeoffice.com/zoom/authorization_callback'
);
const makeLink = () => {
    return `https://marketplace.zoom.us/authorize?response_type=code&redirect_uri=${redirect}&client_id=d34IxwQORf6whs72VnF3g`;
};

function ProvidersSection({ providerSelected, setFieldValue }) {
    const { screenWidth } = useDimensions();
    const { createToast } = useToast();
    const classes = useStyles(styles, { providerSelected });
    const openSignInBrowser = async (url) => {
        try {
            let result = await WebBrowser.openAuthSessionAsync(
                // We add `?` at the end of the URL since the test backend that is used
                // just appends `authToken=<token>` to the URL provided.
                url
            );
            let redirectData;
            if (result.url) {
                redirectData = Linking.parse(result.url);
            }
            console.log({ result, redirectData });
            return result;
        } catch (error) {
            alert(error);
            console.log(error);
        }
        // setResult(result);
    };
    const setProvider = async (provider) => {
        if (provider === 'zoom') {
            const result = await openSignInBrowser();
            if (result.type === 'cancel') {
                return createToast({
                    text: "We couldn't authenticate your Zoom account",
                    icon: 'x',
                    color: 'tomato',
                    id:
                        new Date().toString() +
                        "We couldn't authenticate your Zoom account",
                });
            }
            createToast({
                text: 'Zoom account linked to your kwivrr account',
                icon: 'check-circle',
                color: '#51DA9F',
                id:
                    new Date().toString() +
                    'Zoom account linked to your kwivrr account',
            });
        }
        setFieldValue('provider', provider);
    };

    useEffect(() => {
        if (providerSelected === 'Zoom') {
            const newLink = makeLink();
            openSignInBrowser(newLink);
        }
    }, [providerSelected]);

    return (
        <View style={classes.container}>
            {providerSelected !== '' && (
                <TextRegular
                    style={classes.clear}
                    color="blue"
                    onPress={() => setFieldValue('provider', '')}
                >
                    Clear
                </TextRegular>
            )}
            {PROVIDERS.map((provider, idx) => {
                if (
                    (provider.name === providerSelected &&
                        providerSelected !== '') ||
                    providerSelected === ''
                ) {
                    return (
                        <TouchableOpacity
                            key={idx}
                            onPress={() => setProvider(provider.name)}
                            style={
                                provider.name === 'kwivrr'
                                    ? classes.providerItemKwivrr
                                    : classes.providerItem
                            }
                        >
                            <KwivrrImage
                                style={classes.image}
                                resizeMode={
                                    provider.name === 'kwivrr'
                                        ? 'contain'
                                        : 'cover'
                                }
                                source={{ uri: provider.logo }}
                            />
                        </TouchableOpacity>
                    );
                }
                return null;
            })}
        </View>
    );
}

ProvidersSection.propTypes = {
    providerSelected: PropTypes.string.isRequired,
    setFieldValue: PropTypes.func.isRequired,
};

export default ProvidersSection;
