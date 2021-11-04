import React from 'react';
import KwivrrImage from 'kwivrr-ui/KwivrrImage';

const KwivrrCreditLogo = ({ style }) => (
    <KwivrrImage
        style={style}
        resizeMode="contain"
        source={require('kwivrr-assets/logo/Icon/PNG/Kwivrr_Icon_4C.png')}
    />
);

export default KwivrrCreditLogo;
