import React from 'react';
import KwivrrModal from 'kwivrr-ui/KwivrrModal';
import CreateSpeakerModal from '../CreateSpeakerModal';
import useStyles from 'kwivrr-hooks/useStyles';
import styles from './styles';

function StreamPageModal({
    title,
    close,
    editSpeakerField,
    currentSpeakerIndex,
    ...rest
}) {
    const classes = useStyles(styles);
    return (
        <KwivrrModal
            title={title}
            close={close}
            inNavigation
            absoluteCloseButton
            modalInnerStyle={{
                paddingVertical: 24,
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
            usingScrollView={false}
            titleStyle={classes.titleStyle}
        >
            <CreateSpeakerModal
                editSpeakerField={editSpeakerField}
                currentSpeakerIndex={currentSpeakerIndex}
            />
        </KwivrrModal>
    );
}

export default StreamPageModal;
