import React, { useContext } from 'react';
import { ThemeContext } from 'kwivrr-common/ThemeContext';

function useTheme() {
    return useContext(ThemeContext).theme;
}

export default useTheme;
