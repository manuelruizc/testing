import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import SettingsLayout from 'kwivrr-ui/SettingsLayout';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import Main from './Main';
import Media from './Media';
import UpdatePassword from './UpdatePassword';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import TextRegular from 'kwivrr-ui/TextRegular';
import Personal from './Personal';
import SocialMedia from './SocialMedia';
import BankingInformation from 'kwivrr-ui/BankingInformation/BankingInformation';
import AddBankingAccount from 'kwivrr-ui/AddBankingAccount';
import TextHeader from 'kwivrr-ui/TextHeader';
import { HOME } from 'kwivrr-common/data/types/navigation';
import valid from 'card-validator';
import { useNavigation } from '@react-navigation/native';
import { useAuthCredentials } from 'kwivrr-hooks/useAuthCredentials';
import Payments from 'kwivrr-ui/Payments';
import useActions from 'kwivrr-hooks/useActions';
import useTheme from 'kwivrr-hooks/useTheme';
import Divider from 'kwivrr-ui/Divider';
import useDeviceActions from 'kwivrr-hooks/useDeviceActions';
import usePlatform from 'kwivrr-hooks/usePlatftorm';

function AccountSettings({ userInfo }) {
    const {
        onCreateCreditCard,
        onCreateECheck,
        onSetDefaultCreditCard,
        onSetDefaultEChecks,
        onSetDefaultPaymentOption,
    } = useActions();
    const { keyboardActive, keyboardHeight } = useDeviceActions();
    const { isiOS } = usePlatform();
    const { navigate, goBack } = useNavigation();
    const { updateUserInfo } = useAuthCredentials();
    const classes = useStyles(styles);
    const [changePassword, setChangePassword] = useState(false);
    const { palette } = useTheme();
    const [bankingInformationModal, setBankingInformationModal] =
        useState(false);
    const [bankOptions, setBankOptions] = useState([]);
    const [eChecks, setEChecks] = useState([]);
    const [option, setOption] = useState('card');
    const [bankModal, setBankModal] = useState(false);
    const [creating, setCreating] = useState(false);
    const [paymentOptions, setPaymentsOptions] = useState([]);

    const saveCard = (values, creditCard = true, closeModal) => {
        if (creditCard) {
            saveCreditCard(values.creditCard, closeModal);
        } else {
            saveECheck(values.bankAccount, closeModal);
        }
    };

    const saveECheck = async (bankAccountInfo, closeModal) => {
        const { bankName, accountNumber, nameOnAccount, routingNumber } =
            bankAccountInfo;
        const newECheck = {
            echeck: {
                description: 'Description',
                account_holder_name: nameOnAccount,
                routing_number: routingNumber,
                encrypted_bank_account_number: routingNumber,
                default: false,
            },
            userId: 'me',
            id: 'me',
        };
        const response = await onCreateECheck(newECheck);
        const { id } = response.data.data;
        const newBankAccount = {
            id,
            last4: accountNumber.substr(-4),
            brand: bankName,
            accountHolder: nameOnAccount,
            paymentType: 'bank',
            defaultOption: false,
        };
        setEChecks((prevEChecks) => {
            prevEChecks.push(newBankAccount);
            return [...prevEChecks];
        });
        setCreating(false);
        closeModal();
    };

    const saveCreditCard = async (values, closeModal) => {
        const { cardNumber, expiration } = values;
        const validResponse = valid.number(cardNumber);
        const { type } = validResponse.card;
        const splittedExpiration = expiration.split('/');
        const expiryYear = splittedExpiration[1];
        const expiryMonth = splittedExpiration[0];
        const payload = {
            nameOnCard: values.nameOnCard,
            cardNumber: values.cardNumber,
            expiryYear,
            expiryMonth,
            ccv: values.ccv,
            cardType: type,
            address: {
                line1: values.addressName + ' ' + values.addressLineOne,
                city: values.city,
                state: values.state,
                country: 'US',
                zipcode: values.zipCode,
            },
        };
        const pay = {
            credit_card: {
                name: payload.nameOnCard,
                default: false,
                expiry_year: expiryYear,
                expiry_month: expiryMonth,
                expiry_day: 1,
                cvv: payload.ccv,
                address: payload.address.line1,
                city: payload.address.city,
                state: payload.address.state,
                country: payload.address.country,
                zipcode: payload.address.zipcode,
                card_type: payload.cardType,
                card_number: payload.cardNumber.split(' ').join(''),
                last_four: payload.cardNumber.substr(-4),
            },
        };
        const response = await onCreateCreditCard({
            ...pay,
            userId: 'me',
            id: 'me',
        });
        const { id } = response.data.data;
        const newCard = {
            id,
            last4: cardNumber.substr(-4),
            brand: type,
            paymentType: 'card',
            default: false,
        };
        setBankOptions((prevBank) => {
            prevBank.push(newCard);
            return [...prevBank];
        });

        setCreating(false);
        closeModal();
    };

    const setUserInfoOnMount = () => {
        const newUserInfo = {
            id: userInfo.user_id,
            email: userInfo.email,
            fullName: `${userInfo.firstname} ${userInfo.lastname}`,
            firstName: userInfo.firstname,
            lastName: userInfo.lastname,
            tagline: userInfo.tagline,
            coverUrl: userInfo.banner_url,
            phone: userInfo.phone,
            shopLink: userInfo.shop_link,
            avatar: userInfo.avatar_url,
            ...userInfo,
        };
        updateUserInfo(null, newUserInfo);
    };

    const onSelectDefault = ({ id, paymentType }) => {
        if (paymentType === 'card') {
            onSelectDefaultCard(id);
        } else if (paymentType === 'payment') {
            onSelectPayoutMethod(id);
        } else {
            onSelectECheck(id);
        }
    };

    const onSelectECheck = (id) => {
        onSetDefaultEChecks({ userId: 'me', id });
        setBankOptions((prevEChecks) => {
            return prevEChecks.map((option) => ({
                ...option,
                defaultOption: option.id === id,
            }));
        });
        setEChecks((prevCards) => {
            return prevCards.map((card) => ({
                ...card,
                defaultOption: false,
            }));
        });
    };

    const onSelectPayoutMethod = (id) => {
        onSetDefaultPaymentOption({ userId: 'me', id });
        setPaymentsOptions((prevPaymentOptions) => {
            return prevPaymentOptions.map((option) => ({
                ...option,
                defaultOption: option.id === id,
            }));
        });
    };

    const onSelectDefaultCard = (id) => {
        onSetDefaultCreditCard({ userId: 'me', id });
        setBankOptions((prevBankOptions) => {
            return prevBankOptions.map((option) => ({
                ...option,
                defaultOption: option.id === id,
            }));
        });
        setEChecks((prevEChecks) => {
            return prevEChecks.map((echeck) => ({
                ...echeck,
                defaultOption: false,
            }));
        });
    };

    useEffect(() => {
        setUserInfoOnMount();
    }, []);

    const modalStyle = useMemo(() => {
        if (isiOS) {
            if (option === 'card') return {};
            return {
                marginBottom: keyboardActive ? keyboardHeight / 2 : 0,
            };
        }
        return undefined;
    }, [isiOS, keyboardActive, keyboardHeight, option]);

    return (
        <React.Fragment>
            <SettingsLayout onPress={goBack}>
                <KeyboardAwareScrollView
                    style={classes.scrollViewContainer}
                    contentContainerStyle={classes.scrollViewContentContainer}
                    // keyboardShouldPersistTaps="handled"
                    enableResetScrollToCoords={false}
                >
                    <Main userInfo={userInfo} />
                    <Media userInfo={userInfo} />
                    <Personal userInfo={userInfo} />
                    <SocialMedia userInfo={userInfo} />
                    <Payments
                        paymentOption
                        type="default"
                        payments={bankOptions}
                        setPayments={setBankOptions}
                        openModal={() => setBankModal(true)}
                        onSelect={onSelectDefault}
                    />
                    {/* <Payments
                        paymentOption
                        type="echecks"
                        payments={eChecks}
                        setPayments={setEChecks}
                        openModal={() => setBankModal(true)}
                        onSelect={onSelectDefault}
                    /> */}
                    <View style={classes.addBanking}>
                        <TouchableOpacity onPress={() => setBankModal(true)}>
                            <TextRegular
                                color={palette.button.primary}
                                size={16}
                                style={classes.addBankingText}
                            >
                                + Add Credit Card
                            </TextRegular>
                        </TouchableOpacity>
                    </View>
                    <Divider style={{ marginVertical: 18 }} />
                    <Payments
                        paymentOption
                        type="payment"
                        payments={paymentOptions}
                        setPayments={setPaymentsOptions}
                        openModal={() => setBankingInformationModal(true)}
                        addBankingButton
                        onSelect={onSelectDefault}
                    />
                    <TouchableOpacity
                        onPress={() => navigate(HOME.PAYMENT_HISTORY)}
                    >
                        <TextHeader size={16}>Payment History</TextHeader>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={classes.changePassword}
                        onPress={() => setChangePassword(true)}
                    >
                        <TextRegular>Change Password</TextRegular>
                    </TouchableOpacity>
                </KeyboardAwareScrollView>
                {changePassword && (
                    <KwivrrModal
                        modalStyle={{ ...classes.modalStyle }}
                        title={'Change Your Password'}
                        close={() => setChangePassword(false)}
                    >
                        <UpdatePassword />
                    </KwivrrModal>
                )}
                {bankModal && (
                    <KwivrrModal
                        absoluteCloseButton
                        usingScrollView={false}
                        title="Add Credit Card"
                        close={() => setBankModal(false)}
                        modalStyle={{ ...modalStyle }}
                    >
                        <AddBankingAccount
                            saveCard={saveCard}
                            setLoading={setCreating}
                            isLoading={creating}
                            setOption={setOption}
                        />
                    </KwivrrModal>
                )}
                {bankingInformationModal && (
                    <KwivrrModal
                        absoluteCloseButton
                        title={'Add Banking Information'}
                        close={() => setBankingInformationModal(false)}
                    >
                        <BankingInformation
                            onSave={setPaymentsOptions}
                            setLoading={setCreating}
                            isLoading={creating}
                            onSelect={(option) => console.log(option)}
                        />
                    </KwivrrModal>
                )}
            </SettingsLayout>
        </React.Fragment>
    );
}

export default AccountSettings;
