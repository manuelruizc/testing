import React from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';
import TextRegular from 'kwivrr-ui/TextRegular';
import TextHeader from 'kwivrr-ui/TextHeader';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Touchable from 'kwivrr-ui/Touchable';
import useTheme from 'kwivrr-hooks/useTheme';
import * as WebBrowser from 'expo-web-browser';
import KwivrrIcon from 'kwivrr-ui/KwivrrIcon';
import useActions from 'kwivrr-hooks/useActions';
import useConfirmModal from 'kwivrr-hooks/useConfirmModal';
import sanitizeUrl from 'kwivrr-common/sanitizeUrl';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function ShoppingCard({ article, isCurrentUser, setShopItems }) {
    const {
        id,
        type,
        // change back to camelCase
        attributes: { image_url: imageUrl, name, price, url },
    } = article;
    const { palette } = useTheme();
    const { onDeleteFeaturedItem } = useActions();
    const { openConfirmModal } = useConfirmModal();
    const classes = useStyles(styles);
    const openShopUrl = async () => {
        try {
            const sanitizedUrl = sanitizeUrl(url);
            // alert(url);
            // return;
            const result = await WebBrowser.openBrowserAsync(sanitizedUrl, {
                dismissButtonStyle: 'close',
                controlsColor: palette.loading.indicator,
                readerMode: true,
            });
        } catch (e) {
            alert(JSON.stringify(e));
            // await WebBrowser.dismissBrowser(() => {});
            // Alert.alert('Error while opening url');
        }
    };

    const deleteItem = async (payload) => {
        try {
            await onDeleteFeaturedItem(payload);
            setShopItems((prevShopItems) => {
                return prevShopItems.filter((prev) => prev.id !== payload.id);
            });
        } catch (e) {
            Alert.alert(
                'Error deleting.',
                'There was an error deleting this item.'
            );
        }
    };

    const askToDeleteItem = () => {
        openConfirmModal(
            [
                'Are you sure you want to delete this article?',
                'Cancel',
                'Confirm',
            ],
            deleteItem,
            [{ userId: 'me', id }]
        );
    };

    return (
        <View style={classes.card}>
            <View style={classes.cardImage}>
                <KwivrrImage
                    source={{ uri: imageSourceWithoutCache(imageUrl) }}
                    style={{ width: '100%', height: '100%' }}
                    resizeMode="cover"
                />
            </View>
            <View style={classes.cardFooter}>
                <View style={classes.topInfo}>
                    <TextHeader
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        style={classes.eventName}
                    >
                        {name}
                    </TextHeader>
                    {isCurrentUser && (
                        <TouchableOpacity onPress={askToDeleteItem}>
                            <KwivrrIcon name="trash" color="tomato" size={22} />
                        </TouchableOpacity>
                    )}
                </View>
                <View style={classes.shopBottomInfo}>
                    {price && (
                        <TextRegular>${Number(price).toFixed(2)}</TextRegular>
                    )}
                    <Touchable onPress={openShopUrl}>
                        <View style={classes.viewOnWebsiteButton}>
                            <TextRegular size={16} color={palette.common.white}>
                                View on Website
                            </TextRegular>
                        </View>
                    </Touchable>
                </View>
            </View>
        </View>
    );
}

export default ShoppingCard;
