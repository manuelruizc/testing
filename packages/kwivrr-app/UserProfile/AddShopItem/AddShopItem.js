import React, { useState } from 'react';
import { View } from 'react-native';
import InputComponent from 'kwivrr-ui/InputComponent';
import TextRegular from 'kwivrr-ui/TextRegular';
import UploadMediaWithOptions from 'kwivrr-ui/UploadMediaWithOptions';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import AuthButton from 'kwivrr-ui/AuthButton';
import { useFormik } from 'formik';
import { ShopItemSchema } from './schema';
import Avatar from 'kwivrr-ui/Avatar';
import useActions from 'kwivrr-hooks/useActions';
import imageSourceWithoutCache from 'kwivrr-common/imageSourceWithoutCache';

function AddShopItem({ closeModal, setShopItems }) {
    const { onAddShopItem } = useActions();
    const [loading, setLoading] = useState(false);
    const [imageToShow, setImageToShow] = useState('');
    const {
        values,
        errors,
        touched,
        setFieldValue,
        handleSubmit,
        handleChange,
        handleBlur,
    } = useFormik({
        initialValues: {
            name: '',
            price: '',
            shoppingCartURL: '',
            image: '',
        },
        validationSchema: ShopItemSchema,
        onSubmit: async (_values) => {
            setLoading(true);
            // onAddShopItem({
            //     userId: 'me',
            //     name: _values.name,
            //     description: 'desc',
            //     sorting_weight: 0,
            //     url: _values.shoppingCartURL,
            //     // image_url: _values.image,
            //     image_base64: _values.image,
            //     // price: _values.price,
            // });
            const response = await onAddShopItem({
                title: _values.name,
                price: Number(_values.price).toFixed(2),
                url: _values.shoppingCartURL,
                // price: 20.00,
                // imageUrl: 'https://reallycoolimage.com/home.jpg',
                imageBase64: _values.image,
            });
            console.log(response);
            const { id, imageUrl, price, title, url } = response;
            const newItem = {
                id,
                attributes: {
                    image_url: imageUrl,
                    name: title,
                    price,
                    url,
                },
                // articleImage: _values.image,
                // articleName: _values.name,
                // articlePrice: _values.price,
                // articleShoppingCartURL: _values.shoppingCartURL,
            };
            setShopItems((prev) => {
                let newItems = prev;
                newItems.unshift(newItem);
                return [...newItems];
            });
            setLoading(false);
            closeModal();
        },
    });
    const classes = useStyles(styles);

    return (
        <View style={classes.container}>
            <View style={classes.doubleRow}>
                <InputComponent
                    label="Name"
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    error={errors.name}
                    touched={touched.name}
                    labelSize={16}
                    style={{ width: '55%' }}
                    inputStyle={classes.inputStyle}
                />
                <InputComponent
                    label="Price"
                    onChangeText={handleChange('price')}
                    onBlur={handleBlur('price')}
                    touched={touched.price}
                    labelSize={16}
                    keyboardType="decimal-pad"
                    style={{ width: '35%' }}
                    inputStyle={classes.inputStyle}
                    iconLeft="dollar-sign"
                />
            </View>
            <View style={classes.doubleRow2}>
                <InputComponent
                    label="Shopping Cart URL"
                    onChangeText={handleChange('shoppingCartURL')}
                    onBlur={handleBlur('shoppingCartURL')}
                    error={errors.shoppingCartURL}
                    touched={touched.shoppingCartURL}
                    labelSize={16}
                    style={{ width: '96%' }}
                    inputStyle={classes.inputStyle}
                    placeholder="https://"
                    autoCapitalize="none"
                    autoCompleteType="off"
                    autoCorrect={false}
                />
            </View>
            <View style={classes.doubleRow3}>
                {imageToShow.length === 0 ? (
                    <UploadMediaWithOptions
                        onChange={(imageObject) => {
                            if (!imageObject) return;
                            if (!imageObject.uri) return;
                            const { uri, base64 } = imageObject;
                            if (!uri) return;
                            setFieldValue('image', base64);
                            setImageToShow(uri);
                        }}
                        style={classes.uploadButton}
                        size={88}
                        icon={{ name: 'upload', color: 'white', size: 20 }}
                    />
                ) : (
                    <Avatar
                        onPress={() => {
                            setImageToShow('');
                            setFieldValue('image', '');
                        }}
                        size={88}
                        source={{ uri: imageToShow }}
                    />
                )}
            </View>
            <AuthButton
                backgroundColor="#3551A1"
                buttonStyle={classes.buttonStyle}
                textFontSize={18}
                uppercase={false}
                textColor="white"
                onPress={handleSubmit}
                isLoading={loading}
            >
                Create Item
            </AuthButton>
            <TextRegular style={classes.cancel} onPress={closeModal}>
                Cancel
            </TextRegular>
        </View>
    );
}

export default AddShopItem;
