import React, { useMemo, useState } from 'react';
import { Switch, View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import SettingsLayout from 'kwivrr-ui/SettingsLayout';
import TextHeader from 'kwivrr-ui/TextHeader';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';
import TextRegular from 'kwivrr-ui/TextRegular';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import TermsOfUse from 'kwivrr-ui/TermsOfUse/TermsOfUse';
import PrivacyPolicy from 'kwivrr-ui/PrivacyPolicy';
import usePlatform from '../../../kwivrr-hooks/usePlatftorm';

const DOCUMENTS = {
    PRIVACY: 'Privacy Policy',
    TERMS: 'Terms of Use',
};

function AboutSettings({ navigation }) {
    const [modal, setModal] = useState({
        open: false,
        document: DOCUMENTS.PRIVACY,
    });
    const activeModal = (document) => {
        setModal({
            open: true,
            document,
        });
    };
    const { isAndroid } = usePlatform();
    const modalHeight = useMemo(() => {
        if (isAndroid) {
            return '94%';
        }
        return '100%';
    }, [isAndroid]);
    const classes = useStyles(styles);
    return (
        <>
            <SettingsLayout onPress={() => navigation.goBack()}>
                <TextHeader size={18} style={classes.title}>
                    About
                </TextHeader>
                <TextRegular size={18} style={classes.textBody}>
                    Version 1.0
                </TextRegular>
                <TextRegular
                    onPress={() => activeModal(DOCUMENTS.PRIVACY)}
                    size={18}
                    style={classes.textBody}
                    color="#586EB2"
                >
                    Privacy Policy
                </TextRegular>
                <TextRegular
                    onPress={() => activeModal(DOCUMENTS.TERMS)}
                    size={18}
                    style={classes.textBody}
                    color="#586EB2"
                >
                    Terms of Use
                </TextRegular>
            </SettingsLayout>
            {modal.open && (
                <KwivrrModal
                    close={() => setModal(false)}
                    modalStyle={{ ...classes.modalStyle }}
                    modalInnerStyle={{ ...classes.modalInnerStyle }}
                    modalStyle={{ height: modalHeight }}
                    modalInnerStyle={{ height: '94%' }}
                    title={modal.document}
                >
                    {modal.document === DOCUMENTS.TERMS ? (
                        <TermsOfUse title={modal.document} />
                    ) : (
                        <PrivacyPolicy title={modal.document} />
                    )}
                </KwivrrModal>
            )}
        </>
    );
}

AboutSettings.propTypes = {
    navigation: PropTypes.object,
};

export default AboutSettings;
